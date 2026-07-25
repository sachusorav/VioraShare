"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonationCard() {
  return (
    <Card className="max-w-md w-full bg-card/40 backdrop-blur border-border/50 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <Coffee className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-heading font-bold text-lg">Support VioraShare</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            VioraShare is free, anonymous, and ad-free. Donations help cover the hosting and database costs to keep this service alive!
          </p>
        </div>
        <a 
          href="https://buymeacoffee.com/viorashare" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full font-medium" variant="default">
            <Heart className="w-4 h-4 mr-2 fill-current" />
            Buy me a coffee
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
