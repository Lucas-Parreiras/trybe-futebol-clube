import { ITeams } from '../Interfaces/Teams/ITeams';
import TeamModel from '../models/TeamsModel';
import { ITeamsModel } from '../Interfaces/Teams/ITeamsModel';
import { ServResponse } from '../Interfaces/ServiceResponse';

class TeamService {
  constructor(
    private teamModel: ITeamsModel = new TeamModel(),
  ) { }

  async getAllTeams(): Promise<ServResponse<ITeams[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCESSFUL', data: allTeams };
  }

  async getTeamById(id: number): Promise<ServResponse<ITeams>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };
    return { status: 'SUCESSFUL', data: team };
  }
}

export default TeamService;
