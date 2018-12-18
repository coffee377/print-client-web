import { withRouter } from 'next/router';
import Layout from '../src/components/MyLayout.js';
import React from 'react';

const Content = withRouter((props) => (
	<div>
		<h1>{props.router.query.title}</h1>
		<p>This is the blog post content [{props.router.query.title}].</p>
	</div>)
);

const Page = () => (
	<Layout>
		<Content/>
	</Layout>
);

export default Page;
