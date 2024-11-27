export interface CarbonStarStats {
    onlinePlayers: number
    ramUsage: number
    cpuUsage: number
    timestamp: Date
  }

  export interface CarbonPluginInfo {
    tps: number
    mspt: number
    resources: {
      ramUsage: number
      ramTotal: number
      cpuUsage: number
      cpuCores: number
    }
    playerCountInfo: {
      onlinePlayers: number
      maxPlayers: number
    }
  }