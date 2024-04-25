import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, FloatingLabel, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';




const Upload = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publish_date, setPublicationDate] = useState('');
    const [abstract, setAbstract] = useState('');
    const [file, setFile] = useState(null);
    const [category_id, setCategory] = useState('');
    const [doctype_id, setDoctype] = useState(1);
    const [department_id, setDepartment] = useState('');
    const [course_id, setCourse] = useState('');
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [courses, setCourses] = useState([]);



    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('author', author);
            formData.append('publish_date', publish_date);
            formData.append('abstract', abstract);
            formData.append('category_id', category_id);
            formData.append('file', file);
           
       
   
            const paperResponse = await axios.post('https://node-js-backend-almario1.onrender.com/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
   
            if (paperResponse.data.status === 'Success') {
                Swal.fire({
                    title: 'Success!',
                    text: 'Upload successful',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Failed!',
                    text: 'Upload failed: ' + paperResponse.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred: ' + error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error:', error);
        }
    };




    return (
      <section id="upload" className="block categories-block">
      <Container fluid className="upload-container">
        <div className="title-bar">
          <h1 className="title1">Upload</h1>
        </div>
      </Container >




      <Container className="up-container">




        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="exampleForm.ControlInput"
            label="Research Title"
            className="mb-2"
          >
            <Form.Control
              type="text"
              name="title"
              placeholder="Title of the Research Paper"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
 
            />
          </FloatingLabel>




          <FloatingLabel
            controlId="floatingName"
            label="Author Name"
            className="mb-2"
          >
            <Form.Control
              type="text"
              name="author"
              placeholder="John Doe"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              style={{ height: '40px' }} // Adjust the height here
            />
          </FloatingLabel>








          <FloatingLabel
            controlId="floatingDate"
            label="Published Date"
            className="mb-2"
          >
            <Form.Control
              type="date"
              name="publish_date"
              placeholder="yyyy-mm-dd"
              value={publish_date}
              onChange={(e) => setPublicationDate(e.target.value)}
              required
            />
          </FloatingLabel>








          <FloatingLabel
            controlId="floatingTextarea2"
            label="Abstract of the Paper"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              rows={3}
              name="abstract"
              placeholder="A brief overview of the research paper."
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required
            />
          </FloatingLabel>




             
                    <FloatingLabel controlId="file" label="Please select a PDF file." className="mb-2">
                        <Form.Control type="file" name="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} required />
                    </FloatingLabel>
                    <Button type="submit" className="btn btn-primary">Upload</Button>
                </Form>
            </Container>
        </section>
    );
};




export default Upload;