import React from 'react';
import DocSection from '../Components/ApiDocsComponents/DocSection';
import Endpoint from '../Components/ApiDocsComponents/Endpoint';
import EndpointDoc from '../Components/ApiDocsComponents/EndpointDoc';
import Highlighted from '../Components/ApiDocsComponents/Highlighted';
import Models from '../Components/ApiDocsComponents/Models';
import Section from '../Components/UIComponents/Section';

const apidocs = () => {
	const baseURL = 'https://us-central1-mnwcw2.cloudfunctions.net/widgets';
	// ===================================================================================================================
	//  API DOCUMENTATION
	// ===================================================================================================================
	return (
		<Section makeCard>
			<div className='apiDocs'>
				<div className='top'>
					<div>
						<h1>Council E-survey API</h1>
						<p className='lightText' style={{ paddingTop: '20px' }}>
							RESTful API to retrieve question and response data from the Shangri-la city council.
						</p>
					</div>
					<a href='https://reqbin.com/vt7toghz' rel='noreferrer' target='_blank'>
						<button>Test API</button>
					</a>
				</div>

				<DocSection title='Methods' id='methods'>
					[ Go to <a href='#models'>Models</a> ]
				</DocSection>

				<DocSection title='Base URL'>
					<Highlighted><span style={{fontSize: "1rem"}}>{baseURL}</span></Highlighted>
				</DocSection>

				<DocSection title='Authorization'>
					<p className='desc'>
						This service uses oAuth 2.0-style token validation. The API key must be sent in the <b>Authorization Header</b> as a bearer
						token. You can use the test API key <code>TEST-TEST</code>
					</p>
					<br />
					<span>Example</span>
					<pre>
						<code className='codeArea'>{`					
curl -i ${baseURL}/GetAllQuestions
  -H "Authorization: Bearer <API-KEY>" 
						`}</code>
					</pre>
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

				code {
					background: var(--faintColor);
					padding: 5px 10px;
					border-radius: 5px;
					font-size: 0.95rem;
				}

				pre {
					width: 100%;
					overflow: auto;
					border-radius: 5px;
					background: var(--faint);
					font-size: 15px;
					padding: 0px 15px;
					margin: 20px 0;
					tab-size: 2;
				}
				.codeArea {
					line-height: 27px;
					padding: 0 10px;
				}

				:global(.method) {
					font-weight: bold;
					color: rgb(45, 194, 124);
					margin-right: 10px;
				}

				.top {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					gap: 20px;
				}
			`}</style>
		</Section>
	);
};

export default apidocs;
