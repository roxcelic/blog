import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/pages/posts');

function parseDate(dateString) {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
}

export function getSortedPosts(searchQuery = '') {
  if (searchQuery == "chicken nuggies"){
    return [
      {
        id: "rick",
        title: "government secrets",
        desc: "shhhhhhh",
        auth: "[redacted]",
        tags: ["secret", "..."],
        upDate: "never",
        writeDate: "01.01.1899",
        url: "https://youtu.be/dQw4w9WgXcQ?si=AhaIZFZQuwcuQ6Lf"
      }
    ];
  }
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
  const filteredPosts = allPostsData.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.auth.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return filteredPosts.sort((a, b) => {
    const dateA = parseDate(a.upDate);
    const dateB = parseDate(b.upDate);

    return dateB - dateA;
  });
}
