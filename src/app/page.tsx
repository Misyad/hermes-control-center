"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SystemStatus {
  name: string;
  status: "online" | "offline" | "warning";
  url?: string;
  description: string;
}

const systems: SystemStatus[] = [
  {
    name: "Hermes Agent API",
    status: "online",
    url: "https://api-hermes.projecthasan.com",
    description: "Main API endpoint for Hermes Agent",
  },
  {
    name: "Supabase (CT 105)",
    status: "online",
    url: "http://192.168.1.35:3000",
    description: "PostgreSQL database with Supavisor pooler",
  },
  {
    name: "Proxmox Host",
    status: "online",
    url: "https://192.168.1.100:8006",
    description: "Virtualization host at 192.168.1.100",
  },
  {
    name: "Dockerhost (CT 104)",
    status: "online",
    description: "Docker containers on Proxmox LXC",
  },
  {
    name: "Netflix Bot",
    status: "online",
    description: "Netflix cookie validation bot",
  },
  {
    name: "Telegram Store Bot",
    status: "warning",
    description: "Store bot with Paymenku QRIS integration",
  },
];

const statusColors = {
  online: "bg-green-500",
  offline: "bg-red-500",
  warning: "bg-yellow-500",
};

const statusVariants = {
  online: "default" as const,
  offline: "destructive" as const,
  warning: "secondary" as const,
};

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">🤖 Hermes Control Center</h1>
            <p className="text-muted-foreground mt-2">
              Monitoring dashboard untuk infrastruktur Hermes Agent
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <Card key={system.name} className="hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{system.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[system.status]} animate-pulse`} />
                  <Badge variant={statusVariants[system.status]}>{system.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">{system.description}</CardDescription>
                {system.url && (
                  <a
                    href={system.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-2 block"
                  >
                    {system.url}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations for infrastructure management</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open("https://hermes.projecthasan.com", "_blank")}>
              Hermes Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("https://dash.cloudflare.com", "_blank")}>
              Cloudflare Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("https://github.com/Misyad/hermes-control-center", "_blank")}>
              GitHub Repo
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open("http://192.168.1.35:3000", "_blank")}>
              Supabase Studio
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong>Proxmox Host:</strong> 192.168.1.100</p>
            <p><strong>CT 104 (Dockerhost):</strong> Docker containers - Immich, Telegram bots, Cloudflared tunnel</p>
            <p><strong>CT 105 (Supabase):</strong> PostgreSQL + Supavisor - IP 192.168.1.35</p>
            <p><strong>Cloudflare Tunnel:</strong> api-hermes.projecthasan.com → 192.168.1.70:3001</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
