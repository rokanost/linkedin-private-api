import { filter } from 'lodash';
import { Job } from '../entities/job.entity';
import { Client } from '../core/client';
import { JobScroller } from '../scrollers';

export class JobRepository {
  client: Client;
  
  count: number;

  constructor({ client }: { client: Client }) {
    this.client = client;
    this.count = 0;
  }

  searchAll({ companyId = 0, skip = 0, limit = 25 } = {}): JobScroller {
    return new JobScroller({
      companyId,
      skip,
      limit,
      fetchJobs: this.fetchJobs.bind(this),
    });
  }

  getCount(): number {
    return this.count
  }

  private async fetchJobs({ companyId = 0, skip = 0, limit = 25 } = {}): Promise<Job[]> {
    const response = await this.client.request.job.searchAll({ companyId, skip, limit });
    this.count = response.data.paging.total;
    return filter(response.included, l => l.jobState === "LISTED")
  }

}
