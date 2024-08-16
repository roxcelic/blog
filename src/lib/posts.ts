import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define an interface for post metadata
interface PostMetadata {
  id: string;
  title: string;
  desc: string;
  auth: string;
  tags?: string[];
  upDate: string;
  writeDate: string;
  url: string;
}

// Base directory where posts are located
const postsBaseDirectory = path.join(process.cwd(), 'src/pages/posts');

// Function to parse a date string in DD.MM.YYYY format
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
}

// Function to recursively find all markdown files in the directory
function getPostFiles(directory: string): string[] {
  const files: string[] = [];

  const entries = fs.readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...getPostFiles(fullPath)); // Recurse into subdirectories
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath); // Add the markdown file path
    }
  }

  return files;
}

// Function to get sorted posts with an optional search query
export function getSortedPosts(searchQuery: string = ''): PostMetadata[] {
  // Get all markdown files recursively from the base directory
  const filePaths = getPostFiles(postsBaseDirectory);

  // Extract post data from each file
  const allPostsData: PostMetadata[] = filePaths.map((filePath: string) => {
    const id = path.basename(filePath, '.md');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);

    const relativePath = path.relative(postsBaseDirectory, filePath);

    return {
      id,
      ...(matterResult.data as Omit<PostMetadata, 'id' | 'url'>),
      url: `/posts/${relativePath.replace(/\.md$/, '')}`
    };
  });

  // Filter posts based on the search query
  const filteredPosts = allPostsData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.auth.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Sort posts by date in descending order
  return filteredPosts.sort((a, b) => {
    const dateA = parseDate(a.upDate);
    const dateB = parseDate(b.upDate);

    return dateB.getTime() - dateA.getTime();
  });
}
