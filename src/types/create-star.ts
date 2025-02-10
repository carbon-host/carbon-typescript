export type StarType = "VANILLA" | "PAPER" | "PUFFERFISH" | "SPIGOT" | "FOLIA" | "PURPUR" | "WATERFALL" | "VELOCITY" | "FABRIC" | "BUNGEECORD" | "QUILT" | "FORGE" | "NEOFORGE" | "MOHIST" | "ARCLIGHT" | "SPONGE" | "LEAVES" | "CANVAS" | "ASPAPER" | "LEGACY_FABRIC" | "LOOHP_LIMBO" | "NANOLIMBO" | "CUSTOM"
export type JavaVersion = "8" | "11" | "16" | "17" | "19" | "21" | "22" | "23"

export type AdvancedConfig = {
  billingCycle?: "monthly" | "hourly";
  maximumRamPercentage?: number;
  startupCommand?: string;
  additionalFlags?: "None" | "Aikar's Flags" | "Velocity Flags";
  minehutSupport?: "None" | "Velocity" | "Waterfall" | "Bukkit";
  javaAgent?: string;
  overrideStartup?: boolean;
  automaticUpdating?: boolean;
  simdOperations?: boolean;
  removeUpdateWarnings?: boolean;
  malwareScan?: boolean;
  acceptEula?: boolean;
}

export type CreateStarType = {
  name: string;
  type: StarType;
  version?: string;
  build?: string;
  javaVersion: JavaVersion;
  serverJarName?: string;
  customJarURL?: string;
  resources: {
    memory: number;
  };
  advanced?: AdvancedConfig;
}

export type UpdateStarType = Partial<CreateStarType>;