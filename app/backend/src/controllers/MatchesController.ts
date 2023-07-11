import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.matchesService.findAllMatches();
      return res.status(200).json(serviceResponse.data);
    }

    const progressToBool = inProgress === 'true';

    if (progressToBool) {
      const serviceResponse = await this.matchesService.matchesFilteredByProgress(true);
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchesService.matchesFilteredByProgress(false);
    return res.status(200).json(serviceResponse.data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.finishMatchById(Number(id));

    if (serviceResponse.status !== 'SUCESSFUL') {
      return res.status(400).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}

export default MatchesController;
