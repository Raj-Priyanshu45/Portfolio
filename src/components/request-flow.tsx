import { ArrowDown, ArrowRight, Database, Radio, ShieldCheck, Terminal } from "lucide-react";
import type { Project } from "../lib/content";

const icons = { client: Terminal, core: ShieldCheck, service: Radio, storage: Database };

export function RequestFlow({ project }: { project: Project }) {
  return (
    <div className="architecture" aria-label={`${project.name} architecture`}>
      <div className="architecture-heading"><span>{project.flowLabel}</span><span className="protocol"><span />{project.protocol}</span></div>
      <ol className="flow-nodes">
        {project.flow.map((node, index) => {
          const Icon = icons[node.kind];
          return <li key={node.name} className={`flow-node node-${node.kind}`}>
            <span className="node-icon"><Icon size={19} strokeWidth={1.5} /></span>
            <span className="node-copy"><strong>{node.name}</strong><small>{node.detail}</small></span>
            {index < project.flow.length - 1 && <span className="flow-connector" aria-hidden="true"><ArrowRight className="flow-horizontal" size={17} /><ArrowDown className="flow-vertical" size={17} /></span>}
          </li>;
        })}
      </ol>
      <div className="architecture-note"><span className="mono">↳</span>{project.note}</div>
    </div>
  );
}
