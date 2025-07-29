import React, {useEffect, useState} from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import {Plus, PlusCircle} from 'lucide-react'
import QuillEditor from '../../components/QuillEditor'
import {useForm, Controller, useFieldArray} from 'react-hook-form'
import axios from 'axios'
import {API_BASE_URL} from '../../config/api'
import {toast} from 'react-toastify'

// generate random id
const EditQuestion = () => {

    const [topics, setTopics] = useState([])
    const [error, setError] = useState([])
    const [subSystem, setSubSystem] = useState('')
    const [system, setSystem] = useState('')
    const [subject, setSubject] = useState('')
    const navigate = useNavigate()

    //  form
    const {
        register,
        reset,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: {errors}
    } = useForm({
        defaultValues: {
            topic: '',
            text: '',
            explanation: '',
            options: [
                {value: '', isCorrect: false}
            ]
        }
    })

    // Field array for options
    const {fields, append, remove} = useFieldArray({
        control,
        name: "options"
    })

    // breadcrumb items
    const breadcrumbItems = [
        {label: 'Dashboard', to: '/'},
        {label: 'Edit Question'}
    ]

    // fetching topics
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/topics`)
                setTopics(response.data)
            } catch (err) {
                setError('Failed to fetch topics')
                console.log(err)
            }
        }
        fetchTopics()
    }, [])


    // handleTopicChange
    const handleTopicChange = (event) => {
        let index = event.target.options.selectedIndex - 1;
        if (index > -1) {
            setSubSystem(topics[index].subSystem.name)
            setSystem(topics[index].subSystem.system.name)
            setSubject(topics[index].subSystem.system.subject.name)
        } else {
            setSubSystem('Sub-System')
            setSystem('System')
            setSubject('Subject')
        }
        return event.target.value;
    }

    // handleAddOption
    const handleAddOption = () => {
        append({value: '', isCorrect: false})
    }

    // handleRemoveOption
    const handleRemoveOption = (index) => {
        remove(index)
    }

    // handleCorrectAnswerChange
    const handleCorrectAnswerChange = (selectedIndex) => {
        // All options are set to false first
        fields.forEach((_, index) => {
            setValue(`options.${index}.isCorrect`, false)
        })
        // Only the selected option is set to true
        setValue(`options.${selectedIndex}.isCorrect`, true)
    }

    // submitHandler
    const submitHandler = async (data) => {
        try {
            //At least two options should be there
            if (data.options.length < 2) {
                toast.error("At least 2 options are required");
                return;
            }

            // Validate that at least one option is marked as correct
            const hasCorrectAnswer = data.options.some(option => option.isCorrect);
            if (!hasCorrectAnswer) {
                toast.error("Please select at least one correct answer");
                return;
            }

            // Validate that all options have values
            const hasEmptyOptions = data.options.some(option => !option.value.trim());
            if (hasEmptyOptions) {
                toast.error("Please fill in all option values");
                return;
            }

            console.log("Submitting data:", data);

            const response = await axios.post(`${API_BASE_URL}/questions`, data, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            reset()
            toast.success("Question successfully added!")
            navigate('/all-questions')
        } catch (error) {
            const serverMessage = error.response?.data?.error ? error.response.data.error : "Error adding Question";
            toast.error(serverMessage);
        }
    }

    const values = watch()
    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <div className='overflow-x-auto mx-4 bg-white shadow-sm sm:rounded-lg main-container'>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems}/>

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Edit Question Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Edit Details of the Question.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                            {/* topic */}
                            <div className="sm:col-span-2">
                                <label htmlFor="topicSelect" className="block mb-1 text-sm/6 font-medium text-gray-900">
                                    Topic
                                </label>

                                <Controller
                                    name="topic"
                                    control={control}
                                    defaultValue=""
                                    rules={{required: "Topic is required"}}
                                    render={({field}) => (
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleTopicChange(e);
                                            }}
                                            id='topicSelect'
                                            className="block px-3 py-2.5  w-full rounded-md sm:text-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                        >
                                            <option value="">Select a Topic</option>
                                            {
                                                topics.map((topic) => (
                                                    <option key={topic._id} value={topic._id}>{topic.name}</option>
                                                ))
                                            }
                                        </select>
                                    )}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                                    {/* sub-system */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                            Sub-System
                                            <span className='text-xs text-gray-500'> (Not editable)</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled
                                                value={subSystem || 'Sub-System'}
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 cursor-not-allowed placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    {/* system */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                            System <span className='text-xs text-gray-500'> (Not editable)</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                value={system || 'System'}
                                                disabled
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 cursor-not-allowed placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    {/* subject */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                            Subject
                                            <span className='text-xs text-gray-500'> (Not editable)</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                disabled
                                                value={subject || 'Subject'}
                                                type="text"
                                                autoComplete="given-name"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 cursor-not-allowed placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Question
                                </label>
                                <div className="mt-2 w-full">
                                    <Controller
                                        name="text"
                                        control={control}
                                        defaultValue=""
                                        rules={{required: "Question is required"}}
                                        render={({field}) => (
                                            <QuillEditor
                                                initialValue={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Explanation
                                </label>
                                <div className="mt-2 w-full">
                                    <Controller
                                        name="explanation"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <QuillEditor
                                                initialValue={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            {fields.map((field, index) => (
                                <div key={field.id} className='sm:col-span-2' id='option'>
                                    <div className="grid grid-cols-4 gap-x-6 gap-y-6 mb-5">
                                        <div className="sm:col-span-1">
                                            <label htmlFor={`option-${index}`}
                                                   className="block text-sm/6 font-medium text-gray-900">
                                                Option {index + 1}
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    {...register(`options.${index}.value`, {
                                                        required: `Option ${index + 1} is required`
                                                    })}
                                                    id={`option-${index}`}
                                                    type="text"
                                                    placeholder={`Enter option ${index + 1}`}
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                                {
                                                    errors.options?.[index]?.value && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.options[index].value.message}
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1 ">
                                            <label htmlFor={`correct-${index}`}
                                                   className="block text-sm/6 font-medium text-gray-900">
                                                Is this the correct answer?
                                            </label>
                                            <div className="mt-2 flex items-center gap-2 py-1.5">
                                                <input
                                                    type="radio"
                                                    id={`correct-${index}`}
                                                    name="correctAnswer"
                                                    checked={watch(`options.${index}.isCorrect`)}
                                                    onChange={() => handleCorrectAnswerChange(index)}
                                                    className="size-5 rounded border-gray-300"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2 flex justify-end items-center">
                                            {index === 0 ? (
                                                // Only first option shows "Add Option" button
                                                <button
                                                    onClick={handleAddOption}
                                                    type='button'
                                                    className='rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                >
                                                    Add Option
                                                    <PlusCircle size={18} color="#fff"/>
                                                </button>
                                            ) : (
                                                // All other options show "Remove Option" button
                                                <button
                                                    onClick={() => handleRemoveOption(index)}
                                                    type='button'
                                                    className='rounded-md flex cursor-pointer items-center gap-2 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
                                                >
                                                    Remove Option
                                                    <PlusCircle size={18} color="#fff"/>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex  items-center justify-end gap-x-6">
                        <Link to="/" type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Question
                            <Plus size={18} color="#fff"/>
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditQuestion