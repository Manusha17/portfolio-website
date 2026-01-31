'use client';

import { siteConfig } from '@/data/config';
import { AnimatedSection } from '@/components/atoms/AnimatedSection';
import { ContactForm } from '@/components/molecules/ContactForm';
import { GitPullRequestCreateArrow } from 'lucide-react';
import {
  EmailIcon,
  ClockIcon,
  CheckCircleIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/icons';

export function ContactSection() {
  return (
    <div className="relative bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6 py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <AnimatedSection
              direction="up"
              delay={0}
              className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <GitPullRequestCreateArrow className="h-10 w-10 text-blue-600 sm:h-12 sm:w-12 dark:text-blue-400" />
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl dark:text-slate-100">
                Let&apos;s Work Together
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
                I&apos;m always interested in new opportunities and interesting projects. Let&apos;s
                connect and discuss how we can work together.
              </p>
            </AnimatedSection>
          </div>

          {/* Contact Methods and Form */}
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-5">
            {/* Contact Information */}
            <div className="space-y-8 lg:col-span-2">
              <AnimatedSection direction="left" delay={0.3}>
                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-slate-900">
                  <h3 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Get In Touch
                  </h3>

                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <EmailIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Email
                        </p>
                        <a
                          href={`mailto:${siteConfig.links.email}`}
                          className="text-slate-900 transition-colors hover:text-slate-600 dark:text-slate-100 dark:hover:text-slate-300"
                        >
                          {siteConfig.links.email}
                        </a>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <ClockIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Response Time
                        </p>
                        <p className="text-slate-900 dark:text-slate-100">
                          Usually within 24 hours
                        </p>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                        <CheckCircleIcon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Availability
                        </p>
                        <p className="text-slate-900 dark:text-slate-100">
                          Open to new opportunities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Social Links */}
              <AnimatedSection direction="left" delay={0.3}>
                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-slate-900">
                  <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Connect With Me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                      aria-label="GitHub Profile"
                    >
                      <GitHubIcon className="h-6 w-6" />
                    </a>

                    <a
                      href={siteConfig.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedInIcon className="h-6 w-6" />
                    </a>

                    <a
                      href={siteConfig.links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
                      aria-label="X (Twitter) Profile"
                    >
                      <XIcon className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection direction="right" delay={0.3}>
                <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-slate-900">
                  <h3 className="mb-6 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    Send a Message
                  </h3>
                  <ContactForm />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
