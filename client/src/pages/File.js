import React, { useCallback, useEffect, useState } from 'react';
import axios from "../axios";
import downloadjs from 'downloadjs';
import { Link, useParams, useHistory } from "react-router-dom";


export default () => {

	const [file, setFile] = useState([]);
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		(async function f() {
			const { file } = await axios.get(`file/${id}`)
			setFile(file)
		})()
	}, [id]);

	const updateFile = useCallback(async (e) => {
		const data = new FormData()
		data.append('file', e.target.files[0])
		try{
			const response = await axios.put(`file/update/${file.id}`, data);
			setFile(response.file)
		} catch (e) {
			console.log(e)
		}
	}, [file])

	const deleteFile = useCallback(async (file) => {
		try {
			await axios.delete(`file/delete/${file.id}`)
			history.push('/files')
		} catch (e) {
			console.log(e)
		}
	}, [file])


	const downloadFile = useCallback(async () => {
		let { id, filename, mime } = file;
		try {
			let file = await axios.get(`file/download/${id}`, {responseType: "blob"})
			downloadjs(file, filename, mime);
		} catch (e) {
			console.log(e)
		}
	}, [file])

	const getDate = (time) => {
		return `${new Date(time).getDate()}.${new Date(time).getMonth()} ${new Date(time).getHours()}:${new Date(time).getMinutes()}`
	}

	return <div>

		<table style={{ width: '100%' }}>
			<tbody>
			<tr><td>Filename:</td><td>{file.filename}</td></tr>
			<tr><td>Size:</td><td>{file.size} KB</td></tr>
			<tr><td>Mime type:</td><td>{file.mime}</td></tr>
			<tr><td>Extension:</td><td>{file.ext}</td></tr>
			<tr><td>Created at:</td><td>{getDate(file.createdAt)}</td></tr>
			<tr><td>Updated at:</td><td>{getDate(file.updatedAt)}</td></tr>
			</tbody>
		</table>

		<br/>
		<br/>

		<div style={{ display: "flex" }}>
			<p className="file" onClick={deleteFile.bind(this, file)}>
				<label htmlFor="">Delete document&nbsp;&nbsp;<span className={'fas fa-times'} style={{ color: '#c10000' }} /></label>
			</p>
			<p className="file" onClick={downloadFile.bind(this, file)}>
				<label htmlFor="">Download document&nbsp;&nbsp;<span className={'fas fa-download'} /></label>
			</p>
			<p className="file">
				<input type="file" name="file" id="file" onChange={updateFile}/>
				<label htmlFor="file">Update document&nbsp;&nbsp;<span className={'fas fa-file'} /></label>
			</p>
		</div>

		<br/>
		<Link className="App-link"  to={'/files'}>Back to files</Link>

	</div>
}