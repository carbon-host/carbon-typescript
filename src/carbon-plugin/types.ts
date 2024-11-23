export interface CarbonPluginCommandResponse {
  pagination: {
    limit: number;
    offset: number;
  };
  data: string[];
}