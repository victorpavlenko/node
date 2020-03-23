import React, { useCallback, useEffect, useState } from 'react';
import axios from "../axios";
import downloadjs from 'downloadjs';
import { Link } from "react-router-dom";


export default () => {

	const [files, setFiles] = useState([]);
	const [page, setPage]   = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {(async function f() { fetchFiles()})()}, [page]);

	const uploadFile = useCallback(async (e) => {
		const data = new FormData()
		data.append('file', e.target.files[0])
		try{
			let { file } = await axios.post('file/upload', data);
			setFiles([...files, file])
		} catch (e) {
			console.log(e)
		}
	}, [files])

	const fetchFiles = useCallback(async () => {
		try{
			let { files, count } = await axios.get(`file/list?list_size=${10}&page=${page}`)
			setCount(count)
			setFiles(files)
		} catch (e) {
			console.log(e)
		}
	}, [page])

	const deleteFile = useCallback(async id => {
		try {
			await axios.delete(`file/delete/${id}`)
			let updatedFiles = files.filter((file) => file.id !== id);
			if(!updatedFiles.length && page >= 1) {
				setPage(page - 1)
			}
			setFiles([...updatedFiles])
			setCount(count - 1)

		} catch (e) {
			console.log(e)
		}
	}, [files, count, page])

	const downloadFile = useCallback(async ({ id, filename, mime }) => {
		try {
			let file = await axios.get(`file/download/${id}`, {responseType: "blob"})
			downloadjs(file, filename, mime);
		} catch (e) {
			console.log(e)
		}
	}, [])


	return <div>
		<p className="file">
			<input type="file" name="file" id="file" onChange={uploadFile}/>
			<label htmlFor="file">Upload document&nbsp;&nbsp;<span className={'fas fa-file'} /></label>
		</p>
		<br/>

		<ul className={'App-list'}>
			{!files.length ? 'No files here yet' : ''}
			{files.map((file) =>
				<li key={file.id}>
					<span style={{display: 'flex', alignItems: 'center'}}>
						<span className={'fas fa-folder'} />
						<Link className="App-link"  to={`files/${file.id}`}>{file.filename}</Link>
					</span>
					<span>
						<span className={'fas fa-download'} onClick={() => downloadFile(file)} />
						<span className={'fas fa-times'} onClick={() => deleteFile(file.id)}/>
					</span>
				</li>
			)}
		</ul>

		{files.length > 0 && count > 10 &&
			<div className={'App-pagination'}>
				<div onClick={() => setPage(page - 1)}>{page !== 0 && <i className="fas fa-backward" />}</div>
				<div>{page}</div>
				<div onClick={() => setPage(page + 1)}>{count !== page*10 + files.length && <i className="fas fa-forward" />}</div>
			</div>
		}
		<br/>
		<br/>
	</div>
}