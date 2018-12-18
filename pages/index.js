import React from 'react';
import Layout from '../src/components/MyLayout';
import Link from 'next/link';

const PostLink = (props) => (
	<li>
		<Link href={`/post?id=${props.title}&title=${props.title}`} as={`/p/${props.id}`}>
			<a>{props.title}</a>
		</Link>
	</li>
);

function getPosts(){
	return [
		{id: 'hello-nextjs', title: 'Hello Next.js'},
		{id: 'learn-nextjs', title: 'Learn Next.js is awesome'},
		{id: 'deploy-nextjs', title: 'Deploy apps with ZEIT'},
	];
}

const Index = () => (
	<Layout>
		<h1>My Blog</h1>
		<ul>
			{getPosts().map((post) => (
				<PostLink id={post.id} title={post.title}/>
			))}
		</ul>
	</Layout>
);

export default Index;
