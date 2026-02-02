import { SVGProps } from 'react';
import { GitHubIcon } from './GitHubIcon';
import { LinkedInIcon } from './LinkedInIcon';
import { XIcon } from './XIcon';
import { MediumIcon } from './MediumIcon';
import { EmailIcon } from './EmailIcon';
import { ClockIcon } from './ClockIcon';
import { CheckCircleIcon } from './CheckCircleIcon';
import { UserIcon } from './UserIcon';
import { CodeIcon } from './CodeIcon';
import { CloudIcon } from './CloudIcon';
import { ArrowUpIcon } from './ArrowUpIcon';
import { MenuIcon } from './MenuIcon';
import { CloseIcon } from './CloseIcon';
import { BookIcon } from './BookIcon';
import { EducationIcon } from './EducationIcon';
import { WorkIcon } from './WorkIcon';
import { AchievementIcon } from './AchievementIcon';
import { DefaultTimelineIcon } from './DefaultTimelineIcon';
import { CheckMarkIcon } from './CheckMarkIcon';
import { SpinnerIcon } from './SpinnerIcon';
import { MoonIcon } from './MoonIcon';
import { SunIcon } from './SunIcon';

// Export individual icons
export {
  GitHubIcon,
  LinkedInIcon,
  XIcon,
  MediumIcon,
  EmailIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  CodeIcon,
  CloudIcon,
  ArrowUpIcon,
  MenuIcon,
  CloseIcon,
  BookIcon,
  EducationIcon,
  WorkIcon,
  AchievementIcon,
  DefaultTimelineIcon,
  CheckMarkIcon,
  SpinnerIcon,
  MoonIcon,
  SunIcon,
};

// Icon map for dynamic access
export const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  twitter: XIcon, // Alias for X
  medium: MediumIcon,
  email: EmailIcon,
  clock: ClockIcon,
  checkCircle: CheckCircleIcon,
  user: UserIcon,
  code: CodeIcon,
  cloud: CloudIcon,
  arrowUp: ArrowUpIcon,
  menu: MenuIcon,
  close: CloseIcon,
  book: BookIcon,
  education: EducationIcon,
  work: WorkIcon,
  achievement: AchievementIcon,
  defaultTimeline: DefaultTimelineIcon,
  checkMark: CheckMarkIcon,
  spinner: SpinnerIcon,
  moon: MoonIcon,
  sun: SunIcon,
} as const;

export type IconName = keyof typeof iconMap;

// Dynamic Icon component that accepts a name prop
interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
