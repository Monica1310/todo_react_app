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
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
// import { useColorScheme } from '@mantine/hooks';
// import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);


	// const preferredColorScheme = useColorScheme();
	// const [colorScheme, setColorScheme] = useLocalStorage({
	// 	key: 'mantine-color-scheme',
	// 	defaultValue: 'light',
	// 	getInitialValueInEffect: true,
	// });
	// const toggleColorScheme = value =>
	// 	setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	// useHotkeys([['mod+J', () => toggleColorScheme()]]);

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

	return (
		<div style={{width:'500px',margin:'auto',boxSizing:'border-box',padding:"10px",boxShadow:"rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
		{/* <ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
			> */}
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
								Create Task
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 600,
									color:'teal'
								})}>
								Project:
							</Title>
							{/* <ActionIcon
								color={'blue'}
								onClick={() => toggleColorScheme()}
								size='lg'>
								
									<Sun size={16} />
								
							</ActionIcon> */}
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<ActionIcon
													onClick={() => {
														deleteTask(index);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
												{task.summary
													? task.summary
													: 'No task is assigned'}
											</Text>
										</Card>
									);
								}
							})
						) : (
							
							<Text size={'lg'} mt={'md'} color={'teal'}>
								A goal without a plan is just a wish
							</Text>
						)}
						<Button style={{color:'white',backgroundColor:'teal'}}
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							Task Allocation
						</Button>
					</Container>
				</div>
			</MantineProvider>
		{/* </ColorSchemeProvider> */}
		</div>
	);
}
