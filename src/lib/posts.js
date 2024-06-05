import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

function parseDate(dateString) {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
}

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
      url: `/posts/${id}`
    };
  });

  return allPostsData.sort((a, b) => {
    const dateA = parseDate(a.upDate);
    const dateB = parseDate(b.upDate);

    return dateB - dateA;
  });
}
