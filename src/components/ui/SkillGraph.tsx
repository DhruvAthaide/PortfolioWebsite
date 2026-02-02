import React, { useRef, useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { useTheme } from '../../context/ThemeContext';
import { projects } from '../../data/projects';
import { technicalSkills, programmingSkills, toolsSkills } from '../../data/skills';
import { useNavigate } from 'react-router-dom';
import { Search, RotateCw, Loader2, MousePointer2 } from 'lucide-react';

const SkillGraph: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const fgRef = useRef<any>();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [searchQuery, setSearchQuery] = useState('');
  const [isRotating, setIsRotating] = useState(true);
  
  // Ref to track if we have initialized zoom limits
  const controlsConfigured = useRef(false);
  const angleRef = useRef(0);

  useEffect(() => {
    const nodes: any[] = [];
    const links: any[] = [];
    const nodeExists = (id: string) => nodes.some(n => n.id === id);

    const allSkills = [...technicalSkills, ...programmingSkills, ...toolsSkills];
    
    // Add Skills (Cyan/Blue mainly)
    allSkills.forEach(skill => {
        nodes.push({
            id: skill.name,
            group: 'skill',
            val: (skill.percentage / 10) * 1.5, // Make them a bit bigger
            color: theme === 'dark' ? '#00f3ff' : '#0070f3', // Cyan for dark mode
            desc: `${skill.percentage}% Proficiency`
        });
    });

    // Add Projects (Red/Pink)
    projects.forEach(project => {
        nodes.push({
            id: project.title,
            group: 'project',
            val: 20, // Highlight projects
            color: theme === 'dark' ? '#ff0055' : '#D32F2F', // Neon Red/Pink
            projectId: project.id,
            desc: project.description
        });

        project.technologies.forEach(tech => {
            const matchedSkill = allSkills.find(s => 
                s.name.toLowerCase() === tech.toLowerCase() || 
                s.name.toLowerCase().includes(tech.toLowerCase()) || 
                tech.toLowerCase().includes(s.name.toLowerCase())
            );

            if (matchedSkill) {
                links.push({
                    source: project.title,
                    target: matchedSkill.name,
                    color: theme === 'dark' ? 'rgba(0, 243, 255, 0.15)' : 'rgba(0,0,0,0.1)'
                });
            } else {
                 if (!nodeExists(tech)) {
                     nodes.push({
                        id: tech,
                        group: 'tech',
                        val: 4,
                        color: theme === 'dark' ? '#bd93f9' : '#7928ca',
                        desc: 'Technology'
                     });
                }
                links.push({
                    source: project.title,
                    target: tech,
                    color: theme === 'dark' ? 'rgba(189, 147, 249, 0.15)' : 'rgba(0,0,0,0.1)'
                });
            }
        });
    });

    setGraphData({ nodes, links });
  }, [theme]);

  // Handle Rotation & Zoom Limits
  useEffect(() => {
      // 1. Auto-Rotation Logic
      let frameId: number;
      const rotate = () => {
          if (fgRef.current && isRotating) {
              angleRef.current += 0.002; // Slower, smoother rotation
              const distance = 300;
              const x = distance * Math.sin(angleRef.current);
              const z = distance * Math.cos(angleRef.current);
              
              // Only update if controls exist
              if(fgRef.current.cameraPosition) {
                  const currentCamera = fgRef.current.cameraPosition();
                  fgRef.current.cameraPosition({ x, y: currentCamera.y, z });
              }
          }
          frameId = requestAnimationFrame(rotate);
      };
      rotate();

      // 2. Control Limits (Run periodically to ensure controls are ready)
      const interval = setInterval(() => {
          if (fgRef.current) {
              const controls = fgRef.current.controls();
              if (controls) {
                  controls.minDistance = 10;   // Very close
                  controls.maxDistance = 1000; // Very far
                  controls.enableDamping = true;
                  controls.dampingFactor = 0.1;
                  controls.rotateSpeed = 0.5;
                  controls.zoomSpeed = 1;
                  controlsConfigured.current = true;
                  // Clear interval once found? No, keep checking in case graph re-renders
              }
          }
      }, 1000);

      return () => {
          cancelAnimationFrame(frameId);
          clearInterval(interval);
      };
  }, [isRotating]);

  const handleNodeClick = (node: any) => {
      setIsRotating(false);
      // Smart Zoom: If Project, go closer. If Skill, just focus.
      const distance = node.group === 'project' ? 50 : 80;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
        node,
        2000
      );

      if (node.group === 'project' && node.projectId) {
           setTimeout(() => {
              navigate(`/projects/${node.projectId}`);
          }, 1500); // Wait for zoom
      }
  };

  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if(!searchQuery) return;
      
      const node = (graphData.nodes as any[]).find(n => n.id.toLowerCase().includes(searchQuery.toLowerCase()));
      if (node) {
          handleNodeClick(node);
          setSearchQuery('');
      } else {
          // Simple visual feedback instead of alert
          const input = document.getElementById('skill-search-input');
          if(input) {
              input.classList.add('border-red-500');
              setTimeout(() => input.classList.remove('border-red-500'), 1000);
          }
      }
  };

  return (
    <div className="h-[650px] w-full border border-gray-200 dark:border-dark-600 rounded-xl overflow-hidden shadow-2xl relative bg-black/5 dark:bg-[#050510] backdrop-blur-sm group">
        
        {/* Graph Canvas */}
        <ForceGraph3D
            ref={fgRef}
            graphData={graphData}
            nodeLabel="id"
            nodeAutoColorBy="group"
            backgroundColor="rgba(0,0,0,0)"
            linkColor={(link: any) => link.color}
            nodeColor={(node: any) => node.color}
            onNodeClick={handleNodeClick}
            nodeOpacity={0.9}
            linkOpacity={0.2}
            nodeResolution={16} // Higher quality spheres
            onEngineStop={() => {
                // Initial zoom fit logic if needed
            }}
            showNavInfo={false}
            controlType="orbit"
        />

        {/* 1. Top HUD: Title & Info */}
        <div className="absolute top-6 left-6 z-10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <h3 className="text-2xl font-bold font-mono tracking-tighter text-dark-900 dark:text-white flex items-center gap-2">
                <span className="text-primary-500">NETWORK</span> VISUALIZER
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1 max-w-xs">
                 INTERACTIVE SKILL MATRIX // V.2.0
            </p>
        </div>

        {/* 2. Bottom Dock: Controls & Search */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-2xl px-4 pointer-events-none">
             <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 p-2 flex flex-col md:flex-row items-center gap-3 pointer-events-auto transition-all hover:bg-white dark:hover:bg-black/90">
                 
                 {/* Search Bar */}
                 <form onSubmit={handleSearch} className="flex-1 w-full relative">
                     <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input 
                        id="skill-search-input"
                        type="text" 
                        placeholder="Search node..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent pl-9 pr-4 py-2 text-sm text-dark-900 dark:text-white placeholder-gray-500 outline-none border-none focus:ring-0"
                     />
                 </form>

                 <div className="h-6 w-px bg-gray-300 dark:bg-white/20 hidden md:block"></div>

                 {/* Quick Actions */}
                 <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                     <button
                        onClick={() => setIsRotating(!isRotating)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            isRotating 
                            ? 'bg-primary-500/10 text-primary-600 dark:text-blue-400 border border-primary-500/20' 
                            : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white'
                        }`}
                     >
                        {isRotating ? <Loader2 size={14} className="animate-spin" /> : <MousePointer2 size={14} />}
                        {isRotating ? 'LIVE' : 'MANUAL'}
                     </button>

                     <button
                        onClick={() => {
                            fgRef.current.zoomToFit(1000);
                            setIsRotating(true);
                        }}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                        title="Reset View"
                     >
                        <RotateCw size={14} />
                     </button>
                 </div>
             </div>
             
             {/* Legend */}
             <div className="flex justify-center gap-6 mt-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> Projects</div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Skills</div>
                 <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Tech</div>
             </div>
        </div>
    </div>
  );
};

export default SkillGraph;
