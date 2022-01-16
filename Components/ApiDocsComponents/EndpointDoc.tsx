import React from 'react';
import Highlighted from './Highlighted';

const EndpointDoc = ({ method, link, desc, returnType, exampleCode, parameter = null }) => {
	return (
		<div className='EndpointDoc'>
			<div className='anchor' id={link} />
			<Highlighted>
				<span className='method'>{method}</span>
				<span>{link}</span>
			</Highlighted>

			<h3>Summary</h3>
			<p className='desc'>{desc}</p>

			{parameter && <>
        <h3>Path parameters</h3>
        <div className='parameter'>
          <h4>{parameter.title}</h4>
          <p className='lightText'>{parameter.description}</p>
        </div>
      </>}

			<div className='returnType'>
				Return type: <a href={`#${returnType}`}>{returnType}</a>
			</div>

			<h3>Example data</h3>
			<p className='desc'>
				Content-Type: <span className='code'>application/json</span>
			</p>

			<pre>
				<code>{exampleCode}</code>
			</pre>

			<h3>Procedures</h3>
			<p className='desc'>
				This API call produces the following media types according to the Accept request header; the media type will be conveyed by the
				Content-Type response header.
			</p>
			<br />
			<div className='code'>application/json</div>

			<h3>Responses</h3>
			<table>
				<thead>
					<tr>
						<td>Code</td>
						<td>Status</td>
						<td>Data</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='method'>200</td>
						<td>Response successful</td>
						<td>
							<a href={`#${returnType}`}>{returnType}</a>
						</td>
					</tr>
				</tbody>
			</table>

			{/* STYLE */}
			<style jsx>{`
				.EndpointDoc {
					padding-bottom: 25px;
					margin-bottom: 25px;
					border-bottom: var(--border);
				}

				h3 {
					margin-top: 25px;
					margin-bottom: 10px;
				}

				.returnType {
					padding: 15px 0;
				}

				a {
					color: var(--primaryColor);
					font-weight: bold;
				}

				a:hover {
					text-decoration: underline;
				}

				pre {
					width: 100%;
					overflow: auto;
					border-radius: 5px;
					background: var(--faint);
					font-size: 15px;
					padding: 5px 15px;
					margin: 20px 0;
					tab-size: 2;
				}

				code {
					white-space: pre;
					opacity: 0.7;
					font-family: monospace;
				}

				.code {
					background: var(--faintColor);
					display: inline-block;
					font-size: 0.95;
					padding: 10px 15px;
					border-radius: 5px;
					line-height: 20px;
				}
				table {
					border: var(--border);
					margin-top: 20px;
					border-collapse: collapse;
					width: 100%;
				}
				td {
					padding: 12px 20px;
					border-right: var(--border);
				}
				tr {
					border-top: var(--border);
				}
				thead {
					font-weight: bold;
				}

        .parameter {
          margin: 20px ;
        }
        .parameter p {
          margin-top: 10px;
        }
			`}</style>
		</div>
	);
};

export default EndpointDoc;
