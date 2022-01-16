import Link from 'next/link';
import React from 'react';
import DocSection from '../Components/ApiDocsComponents/DocSection';
import Endpoint from '../Components/ApiDocsComponents/Endpoint';
import EndpointDoc from '../Components/ApiDocsComponents/EndpointDoc';
import Highlighted from '../Components/ApiDocsComponents/Highlighted';
import Models from '../Components/ApiDocsComponents/Models';
import Section from '../Components/UIComponents/Section';

const apidocs = () => {
	return (
		<Section makeCard>
			<div className='apiDocs'>
				<h1>Council E-survey API</h1>
				<p className='lightText' style={{ paddingTop: '20px' }}>
					RESTful API to retrieve question and response data from the Shangri-la city council.
				</p>

				<DocSection title='Methods' id='methods'>
					[ Go to <a href='#models'>Models</a> ]
				</DocSection>

				<DocSection title='Endpoints'>
					<a href='#default'>
						<h3>Default</h3>
					</a>

					<ul>
						<li>
							<Endpoint method='GET' link='/GetAllQuestions' />
						</li>
						<li>
							<Endpoint method='GET' link='/GetQuestionOptions/{questionID}' />
						</li>
						<li>
							<Endpoint method='GET' link='/GetQuestionResponse/{questionID}' />
						</li>
					</ul>
				</DocSection>

				<DocSection title='Default' id='default'>
					<EndpointDoc
						method='GET'
						link='/GetAllQuestions'
						desc='Get all the questions in the database.'
						returnType='Questions'
						exampleCode={`
{  
	"consulations" : {
		"Questions" : [ 
			{
				"id" : "question0001",
				"text" : "Do you have a petrol/diesel car?"
			}, 
			{
				"id" : "question0002",
				"text" : "How often do you charge your car?"
			} 
		]
	}
}
						`}
					/>
					<EndpointDoc
						method='GET'
						link='/GetQuestionOptions/{questionID}'
						desc='Get the options to a question.'
						returnType='Options'
						parameter={{ title: 'questionID', description: 'Path parameter - ID of the question' }}
						exampleCode={`
{
	"Question" : "question003",
	"Options" : [ 
		{
			"id" : "option001",
			"Text" : "Inside the ring road"
		}, 
		{
			"id" : "option002",
			"Text" : "Outskirt of town road"
		} 
	]
}
						`}
					/>

					<EndpointDoc
						method='GET'
						link='/GetQuestionResponse/{questionID}'
						desc='Get user responses to options (get question responses).'
						returnType='Responses'
						parameter={{ title: 'questionID', description: 'Path parameter - ID of the question' }}
						exampleCode={`
{
	"Question" : "question003",
	"Answers" : [ 
		{
			"id" : "option001",
			"count" : "100"
		}, 
		{
			"id" : "option002",
			"count" : "1000"
		} 
	]
}
						`}
					/>
				</DocSection>

				<DocSection title='Models'>
					<Models />
				</DocSection>
			</div>

			{/* STYLE */}
			<style jsx>{`
				:global(html) {
					scroll-behavior: smooth;
				}

				:global(.anchor) {
					display: block;
					position: relative;
					visibility: hidden;
					top: -80px;
				}

				a {
					color: var(--primaryColor);
					font-weight: bold;
				}

				a:hover {
					text-decoration: underline;
				}

				li {
					list-style: disc;
					list-style-position: inside;
				}

				:global(.method) {
					font-weight: bold;
					color: rgb(45, 194, 124);
					margin-right: 10px;
				}
				
			`}</style>
		</Section>
	);
};

export default apidocs;
