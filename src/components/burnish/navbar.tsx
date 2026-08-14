import { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/ui/github-icon';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold gradient-text">BURNISH</span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <a href="https://burnish.dev/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com/burnish" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div
        className={cn(
          'border-t border-border bg-background md:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          <Button variant="ghost" size="sm" asChild className="justify-start">
            <a href="https://burnish.dev/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild className="justify-start">
            <a href="https://github.com/burnish" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
