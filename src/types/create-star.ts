/*
export const ZodSoftwareType = z.enum(["VANILLA", "PAPER", "PUFFERFISH", "SPIGOT", "FOLIA", "PURPUR", "WATERFALL", "VELOCITY", "FABRIC", "BUNGEECORD", "QUILT", "FORGE", "NEOFORGE", "MOHIST", "ARCLIGHT", "SPONGE", "LEAVES", "CANVAS", "ASPAPER", "LEGACY_FABRIC", "LOOHP_LIMBO", "NANOLIMBO", "CUSTOM"])

export const ZodJavaVersion = z.enum(["8", "11", "16", "17", "19", "21", "22", "23"])

export const ZodEggVariables = z.object({
    SERVER_JARFILE: z.string().regex(/^([\w\d._-]+)(\.[jJ][aA][rR])$/, {
        message: "Server jar file must be a valid jar filename"
    }),

    ADDITIONAL_FLAGS: z.enum(["None", "Aikar's Flags", "Velocity Flags"], {
        errorMap: () => ({ message: "Invalid additional flags selection" })
    }),

    MAXIMUM_RAM: z.coerce.number().int().min(50).max(100).default(90).transform(val => val.toString()),

    MINEHUT_SUPPORT: z.enum(["None", "Velocity", "Waterfall", "Bukkit"], {
        errorMap: () => ({ message: "Invalid Minehut support option" })
    }),

    LOG_PREFIX: z.string().optional(),

    JAVA_AGENT: z.string().regex(/^([\w\d._-]+)(\.[jJ][aA][rR])$/, {
        message: "Java agent must be a valid jar filename"
    }).optional(),

    OVERRIDE_STARTUP: z.boolean().default(true).describe("ADVANCED FEATURE: Override the displayed startup command to support all other variables, contact support to change."),

    AUTOMATIC_UPDATING: z.boolean().default(false),

    SIMD_OPERATIONS: z.boolean().default(false),

    REMOVE_UPDATE_WARNING: z.boolean().default(true),

    MALWARE_SCAN: z.boolean().default(false),

    SOFTWARE: ZodSoftwareType.default("PAPER"),

    VERSION: z.string().default("latest"),

    BUILD: z.string().default("latest"),
    
    CUSTOM_JAR_URL: z.string().optional(),

    AUTO_ACCEPT_EULA: z.boolean().default(false),
})

*/

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