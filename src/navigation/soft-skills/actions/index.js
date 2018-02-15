import softskills from './soft-skills.json';

export const FETCH_SOFT_SKILLS = 'fetch-soft-skills';

export function fetchSoftSkills() {
  return {
    type: FETCH_SOFT_SKILLS,
    payload: softskills.items
  }
}
