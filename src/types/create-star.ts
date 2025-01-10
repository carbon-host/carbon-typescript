export type StarType = "VANILLA" | "PAPER" | "PUFFERFISH" | "PURPUR" | "FOLIA" | "VELOCITY" | "WATERFALL" | "FORGE" | "FABRIC" | "CUSTOM";

export type AdvancedConfig = {
  billingCycle?: "monthly" | "hourly";
}

export type CreateStarType = {
  name: string;
  type: StarType;
  customJar?: string;
  version?: string;
  javaVersion: "8" | "11" | "17" | "21";
  resources: {
    memory: number;
  };
  advanced?: AdvancedConfig;
}

export type UpdateStarType = Partial<CreateStarType>;