import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
	Code,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import {Trash } from 'tabler-icons-react';

import {MantineProvider} from '@mantine/core';


export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);
	const [text,setText] = useState("")
	const [sub,setSub] = useState()
	const [titles,setTitles] = useState()
	const [state,setState] = useState(false)

	const taskTitle = useRef('');
	const taskSummary = useRef('');

	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
			},
		]);
	}

	function deleteTask(index) {
		var clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	useEffect(() => {
		loadTasks();
	}, []);

	const handleChange = (e) => {

		setText(e.target.value)
		

	}

	const handleSub = (e) => {
	
		setSub(text)
		setState(true)

	}
	console.log(sub,"sub")
	console.log(state)
	

	// const title = localStorage.getItem("title")
	// console.log(title)

	return (
		<div style={{width:'500px',margin:'auto',boxSizing:'border-box'
		,padding:"10px",boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px",
		backgroundColor:'teal'}}>
		
			<MantineProvider
				theme={{ defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={'New Task'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Enter Name'}
							required
							label={'Team Member'}
						/>
						<TextInput
							ref={taskSummary}
							mt={'md'}
							placeholder={'Task'}
							label={'Task'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button style={{color:'white',backgroundColor:'teal'}}
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button style={{color:'white',backgroundColor:'teal'}}
								onClick={() => {
									createTask();
									setOpened(false);
								}}>
								Create 
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						{state === false ? (
							<>
							<input style={{ height:"40px",borderRadius:'35px',width:'280px',
							border:'1px solid white',
							boxSizing:"border-box" ,padding:'10px'}} 
							onChange={handleChange} placeholder='Enter Project Title Here'/>
							<button 
							style={{color:'teal',backgroundColor:"white",marginLeft:'50px',
							border:'1px solid white',borderRadius:'25px',width:"100px",height:'40px'}} 
							onClick={handleSub}>Add
							</button>	
							</>
								):(
									<>

									<Group position={'apart'}>
									<Title
									sx={theme => ({
										fontFamily: `Greycliff CF, ${theme.fontFamily}`,
										fontWeight: 400,
										color:'white'
									})}>
									Project : {sub}
								</Title>		
							</Group>
							</>
								)}
					

						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<div style={{marginRight:'6px'}}>
												<ActionIcon
													onClick={() => {
														deleteTask(index);
													}}
													color={'red'}
													variant={'transparent'}
													
													>
												    
													<Trash />
												</ActionIcon>

												</div>
												
											</Group>

											<div style={{display:'flex',justifyContent:"space-between"}}>
												
												<div>
													<Text color={'dimmed'} size={'md'} mt={'sm'}>
													{task.summary
														? task.summary
														: 'No task is assigned'}
													</Text>
												</div>
												<div>
												  <input style={{width:"40px",height:'20px',marginTop:'10px'}} type="checkbox" />
												</div>
											
											</div>
										</Card>
									);
								}
							})
						) : (
							
							<Text size={'lg'} mt={'md'} color={'black'}>
								"A goal without a plan is just a wish !"
							</Text>
						)}
						<Button style={{color:'teal',
						backgroundColor:'white',borderRadius:'25px',height:'40px'}}
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							Start Planning
						</Button>
					</Container>
				</div>
			</MantineProvider>
		
		</div>
	);
}
