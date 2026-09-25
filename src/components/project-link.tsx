import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import type { Project } from "@/data/projects";

/**
 * Links a project card to its dedicated detail page when one exists,
 * otherwise to the project's anchor on the portfolio page. The current
 * language prefix is kept because the `{-$lang}` param is inherited.
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
      <Link
        to="/{-$lang}/portfolio/$slug"
        params={(previous) => ({ ...previous, slug: project.slug })}
        className={className}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link to="/{-$lang}/portfolio" hash={project.slug} className={className}>
      {children}
    </Link>
  );
}
