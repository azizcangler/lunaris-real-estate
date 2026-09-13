import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import type { Project } from "@/data/projects";

/**
 * Links a project card to its dedicated detail page when one exists,
 * otherwise to the project's anchor on the portfolio page.
 */
export function ProjectLink({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  if (project.details) {
    return (
      <Link to="/portfolio/$slug" params={{ slug: project.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/portfolio" hash={project.slug} className={className}>
      {children}
    </Link>
  );
}
