import { useState, useCallback } from 'react';

export type FileType = 'file' | 'directory';

export interface FileSystemNode {
  name: string;
  type: FileType;
  content?: string;
  children?: { [key: string]: FileSystemNode };
  parent?: FileSystemNode | null; // useful for traversing back, but circular refs in state can be tricky.
                                  // We'll manage path traversal via path string arrays instead.
}

const initialFileSystem: FileSystemNode = {
  name: 'root',
  type: 'directory',
  children: {
    'home': {
      name: 'home',
      type: 'directory',
      children: {
        'guest': {
          name: 'guest',
          type: 'directory',
          children: {
            'skills.txt': {
              name: 'skills.txt',
              type: 'file',
              content: 'Red Team Analysis\nPenetration Testing\nPython\nReact\nAndroid Security\nCryptography\nNetwork Forensics'
            },
            'contact.txt': {
              name: 'contact.txt',
              type: 'file',
              content: 'Email: athaidedhruv@gmail.com\nLocation: Mumbai, India\nGitHub: github.com/DhruvAthaide'
            },
            'projects': {
              name: 'projects',
              type: 'directory',
              children: {
                'readme.md': {
                  name: 'readme.md',
                  type: 'file',
                  content: 'Check out the /projects page for a GUI view of my work!'
                }
              }
            },
            'secrets': {
              name: 'secrets',
              type: 'directory',
              children: {}
            }
          }
        }
      }
    },
    'bin': {
      name: 'bin',
      type: 'directory',
      children: {}
    },
    'etc': {
      name: 'etc',
      type: 'directory',
      children: {}
    }
  }
};

export const useFileSystem = () => {
  // We keep track of the file system structure
  const [fs, setFs] = useState<FileSystemNode>(initialFileSystem);
  // Current path as array of strings, e.g. ['home', 'guest']
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'guest']);

  // Helper to get node at specific path
  const getNodeAtPath = useCallback((path: string[], root: FileSystemNode = fs): FileSystemNode | null => {
    let current = root;
    for (const part of path) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  }, [fs]);

  const getCurrentNode = useCallback(() => {
    return getNodeAtPath(currentPath);
  }, [currentPath, getNodeAtPath]);

  const ls = useCallback(() => {
    const node = getCurrentNode();
    if (!node || !node.children) return [];
    return Object.values(node.children).map(child => ({
      name: child.name,
      type: child.type
    }));
  }, [getCurrentNode]);

  const cd = useCallback((path: string) => {
    if (path === '/' || path === '~') {
      setCurrentPath(['home', 'guest']);
      return 'Moved to ~';
    }
    
    if (path === '..') {
      if (currentPath.length > 0) {
        setCurrentPath(prev => prev.slice(0, -1));
        return ''; // Silent success
      }
      return ''; // Already at root
    }

    // Handle relative path (simple one level for now, can be expanded)
    const targetNode = getNodeAtPath([...currentPath, path]);
    if (targetNode && targetNode.type === 'directory') {
      setCurrentPath(prev => [...prev, path]);
      return '';
    }

    return `cd: no such file or directory: ${path}`;
  }, [currentPath, getNodeAtPath]);

  const cat = useCallback((filename: string) => {
    const node = getCurrentNode();
    if (!node || !node.children) return `Error: Current directory invalid`;
    
    const file = node.children[filename];
    if (!file) return `cat: ${filename}: No such file or directory`;
    if (file.type === 'directory') return `cat: ${filename}: Is a directory`;
    
    return file.content || '';
  }, [getCurrentNode]);

  const mkdir = useCallback((dirname: string) => {
    setFs(prevFs => {
      // Deep clone to avoid mutation
      const newFs = JSON.parse(JSON.stringify(prevFs));
      
      // Traverse to current directory
      let current = newFs;
      for (const part of currentPath) {
        current = current.children[part];
      }
      
      if (current.children[dirname]) {
        return prevFs; // Already exists
      }
      
      current.children[dirname] = {
        name: dirname,
        type: 'directory',
        children: {}
      };
      
      return newFs;
    });
    return '';
  }, [currentPath]);

  const touch = useCallback((filename: string) => {
    setFs(prevFs => {
      const newFs = JSON.parse(JSON.stringify(prevFs));
      let current = newFs;
      for (const part of currentPath) {
        current = current.children[part];
      }
      
      if (current.children[filename]) {
        return prevFs; // Already exists, update timestamp logic could go here
      }
      
      current.children[filename] = {
        name: filename,
        type: 'file',
        content: ''
      };
      
      return newFs;
    });
    return '';
  }, [currentPath]);

  const rm = useCallback((target: string) => {
    let result = '';
    setFs(prevFs => {
      const newFs = JSON.parse(JSON.stringify(prevFs));
      let current = newFs;
      for (const part of currentPath) {
        current = current.children[part];
      }
      
      if (!current.children[target]) {
        result = `rm: cannot remove '${target}': No such file or directory`;
        return prevFs;
      }
      
      delete current.children[target];
      return newFs;
    });
    return result;
  }, [currentPath]);

  return {
    currentPath,
    ls,
    cd,
    cat,
    mkdir,
    touch,
    rm,
    fs
  };
};
