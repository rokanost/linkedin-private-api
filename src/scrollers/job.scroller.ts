import { Job } from '../entities/job.entity';
import { SkipLimitScroller } from './skip-limit-scroller';

type FetchJobs = ({ companyId, skip, limit }: { companyId: number, skip?: number; limit?: number }) => Promise<Job[]>;

export class JobScroller extends SkipLimitScroller<Job> {
  private fetchJobs: FetchJobs;

  private companyId: number;

  constructor({ companyId, fetchJobs, skip = 0, limit = 100 }: { companyId: number, fetchJobs: FetchJobs; skip: number; limit: number }) {
    super({ skip, limit });

    this.fetchJobs = fetchJobs;
    this.companyId = companyId;
  }

  async fetch(): Promise<Job[]> {
    return this.fetchJobs({ companyId: this.companyId, skip: this.skip, limit: this.limit });
  }
}
