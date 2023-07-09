import { Request, Response } from 'express';
import TeamService from '../services/teamsService';

class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) { }

  async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getTeamById(Number(id));

    if (serviceResponse.status === 'NOT_FOUND') {
      return res.status(404).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}

export default TeamController;
