import { LinkedInRequest } from '../core/linkedin-request';

export class JobRequest {
  private request: LinkedInRequest;

  constructor({ request }: { request: LinkedInRequest }) {
    this.request = request;
  }

  searchAll({
    companyId,
    skip = 0,
    limit = 10
  }: {
    companyId: number;
    skip?: number;
    limit?: number;
    // filters?: BlendedSearchFilters;
    // keywords?: string;
  }): Promise<any> {
    // const queryParams = {
    //   filters,
    //   count: limit,
    //   ...(keywords ? { keywords: encodeURIComponent(keywords) } : {}),
    //   origin: 'TYPEAHEAD_ESCAPE_HATCH',
    //   q: 'all',
    //   queryContext: {
    //     spellCorrectionEnabled: true,
    //     relatedSearchesEnabled: true,
    //   },
    //   start: skip,
    // };

    const queryParams = {
      decorationId: 'com.linkedin.voyager.deco.jserp.WebJobSearchHitWithSalary-23',
      filters: {
        company: companyId,
        geoUrn: 'urn:li:fs_geo:92000000',
        resultType: 'JOBS'
      },
      count: limit,
      origin: 'COMPANY_PAGE_JOBS_CLUSTER_EXPANSION',
      q: 'jserpFilters',
      queryContext: {
        spellCorrectionEnabled: true,
        primaryHitType: 'JOBS',
      },
      start: skip,
      topNRequestedFlavors: [
        'HIDDEN_GEM',
        'IN_NETWORK',
        'SCHOOL_RECRUIT',
        'COMPANY_RECRUIT',
        'SALARY',
        'JOB_SEEKER_QUALIFIED',
        'PREFERRED_COMMUTE',
        'PRE_SCREENING_QUESTIONS',
        'SKILL_ASSESSMENTS',
        'ACTIVELY_HIRING_COMPANY',
        'TOP_APPLICANT'
      ]
    };
    // decorationId=com.linkedin.voyager.deco.jserp.WebJobSearchHitWithSalary-23
    // count=25
    // filters=List(company-%3E162479,geoUrn-%3Eurn%3Ali%3Afs_geo%3A92000000,resultType-%3EJOBS)
    // origin=COMPANY_PAGE_JOBS_CLUSTER_EXPANSION
    // q=jserpFilters
    // queryContext=List(primaryHitType-%3EJOBS,spellCorrectionEnabled-%3Etrue)
    // topNRequestedFlavors=List(HIDDEN_GEM,IN_NETWORK,SCHOOL_RECRUIT,COMPANY_RECRUIT,SALARY,JOB_SEEKER_QUALIFIED,PREFERRED_COMMUTE,PRE_SCREENING_QUESTIONS,SKILL_ASSESSMENTS,ACTIVELY_HIRING_COMPANY,TOP_APPLICANT)

    return this.request.get('search/hits', {
      params: queryParams,
    });
  }
}

