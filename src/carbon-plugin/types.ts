export interface CarbonPluginCommandResponse {
  pagination: {
    limit: number;
    offset: number;
  };
  data: string[];
}

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

  firstPlayed: number;
  lastSeen: number;
  lastLogin: number;

  isOp: boolean;
  idleDuration: number;
  ping: number;
  location: {
    x: number;
    y: number;
    z: number;
    world: string;
  };
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