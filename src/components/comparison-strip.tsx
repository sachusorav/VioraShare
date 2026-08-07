import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "No login required",    viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "no"      },
  { feature: "Auto-deletes files",   viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "partial" },
  { feature: "Shared clipboard",     viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "no"      },
  { feature: "Zero personal data",   viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "partial" },
  { feature: "Passcode protection",  viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "no"      },
  { feature: "Self-destruct files",  viora: "yes", whatsapp: "no",  gdrive: "no",  wetransfer: "no"      },
];

/**
 * Cell — single accent for ✓ (primary/teal), neutral for ✕ and partial.
 * No green/red/yellow in a comparison grid — they add noise.
 */
function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  return (
    <td className={`py-3.5 px-4 text-center ${highlight ? "bg-primary/6" : ""}`}>
      {value === "yes" ? (
        <Check
          className={`w-4 h-4 mx-auto ${highlight ? "text-primary" : "text-muted-foreground/30"}`}
          strokeWidth={2.5}
        />
      ) : value === "partial" ? (
        <Minus className="w-4 h-4 mx-auto text-muted-foreground/25" strokeWidth={2} />
      ) : (
        <X className="w-4 h-4 mx-auto text-muted-foreground/20" strokeWidth={2} />
      )}
    </td>
  );
}

export function ComparisonStrip() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-5 space-y-1">
        <h2 className="type-h1">How we compare</h2>
        <p className="type-caption text-muted-foreground/50">
          VioraShare vs the tools people currently misuse for private sharing.
        </p>
      </div>

      <div className="surface rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-3 px-4 text-left type-caption font-bold text-muted-foreground/50 uppercase tracking-wider w-2/5">
                Feature
              </th>
              <th className="py-3 px-4 text-center type-caption font-bold text-primary uppercase tracking-wider bg-primary/6">
                VioraShare
              </th>
              <th className="py-3 px-4 text-center type-caption font-semibold text-muted-foreground/40 uppercase tracking-wider">
                WhatsApp
              </th>
              <th className="py-3 px-4 text-center type-caption font-semibold text-muted-foreground/40 uppercase tracking-wider hidden sm:table-cell">
                Google Drive
              </th>
              <th className="py-3 px-4 text-center type-caption font-semibold text-muted-foreground/40 uppercase tracking-wider hidden sm:table-cell">
                WeTransfer
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {rows.map((row) => (
              <tr key={row.feature} className="hover:bg-muted/20 transition-colors duration-100">
                <td className="py-3.5 px-4 type-body font-medium text-foreground/80">
                  {row.feature}
                </td>
                <Cell value={row.viora} highlight />
                <Cell value={row.whatsapp} />
                <td className="hidden sm:table-cell py-0">
                  <Cell value={row.gdrive} />
                </td>
                <td className="hidden sm:table-cell py-0">
                  <Cell value={row.wetransfer} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center type-caption text-muted-foreground/25 mt-2">
        — partial or limited support
      </p>
    </div>
  );
}
