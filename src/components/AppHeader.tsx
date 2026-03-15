import { Bell, Search, UserCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function AppHeader() {
  return (
    <header className="h-16 border-b bg-white/50 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger />
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar pacientes, relatórios..."
            className="pl-9 bg-background w-full rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-destructive rounded-full" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="pl-0 pr-0 sm:pr-2 gap-2 rounded-full hover:bg-transparent"
            >
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=male&seed=12" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-sm font-medium leading-none">Dr. Renato Alves</span>
                <span className="text-xs text-muted-foreground mt-1">CRM 12345-SP</span>
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-56">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Dr. Renato Alves</p>
              <p className="text-xs leading-none text-muted-foreground">Neurologista</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  )
}
