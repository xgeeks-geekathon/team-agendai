import { faker } from '@faker-js/faker';
import response from './response.json';

const mapJiraTask = (issue: typeof response['issues'][0]) => ({
  id: parseInt(issue.id, 10),
  type: {
    name: issue.fields.issuetype.name,
    icon: issue.fields.issuetype.iconUrl,
  },
  assignee: {
    name: issue.fields.assignee.displayName,
    avatar: issue.fields.assignee.avatarUrls['48x48'],
  },
  priority: 0,
  original_id: issue.key,
  title: issue.fields.summary,
  description: issue.fields.description || '',
  status: issue.fields.status.name,
  estimation: issue.fields.timeestimate || issue.fields.customfield_10016,
  created_at: issue.fields.created,
  updated_at: issue.fields.updated,
});
// export const getFakeTask = (): Tasks.TaskApi => ({
//   id: faker.number.int(),
//   assignee: {
//     name: faker.person.fullName(),
//     avatar: faker.image.avatar(),
//   },
//   priority: faker.number.int({ min: 1, max: 3 }),
//   estimation: faker.number.int({ min: 1, max: 20 }),
//   description: faker.lorem.paragraphs(3),
//   original_id: `PK-${faker.string.alphanumeric(3)}`,
//   status: faker.helpers.arrayElement(['todo', 'inprogress']),
//   title: faker.company.name(),
//   created_at: faker.date.anytime().toUTCString(),
//   updated_at: faker.date.anytime().toUTCString(),
//   type: {
//     name: 'Story',
//     icon: faker.image.avatar(),
//   },
// });

export const getFakeTask = (): Tasks.TaskApi => {
  return mapJiraTask(response.issues[Math.floor(Math.random() * response.issues.length)]);
};

export const getFakeEnchancement = (): Tasks.Enhancement.EnhancementApi => ({
  id: faker.number.int(),
  estimation: faker.number.int({ min: 1, max: 20 }),
  description: faker.lorem.paragraphs(3),
  title: faker.company.name(),
  created_at: faker.date.anytime().toUTCString(),
  updated_at: faker.date.anytime().toUTCString(),
});

// export const getFakeTasks = () => {
//   return Array.from({ length: 10 }).map(getFakeTask);
// };

export const getFakeTasks = (): Tasks.TaskApi[] => {
  return response.issues.map(mapJiraTask);
};
