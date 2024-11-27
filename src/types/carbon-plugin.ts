export interface Pagination {
  limit: number;
  offset: number;
}

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

export interface CarbonPluginPlayerInfo {
  name: string;
  uuid: string;
}

export interface CarbonPluginPlayersResponse {
  pagination: Pagination;
  data: {
    players: CarbonPluginPlayerInfo[];
    countInfo: {
      onlinePlayers: number;
      maxPlayers: number;
    };
  };
}