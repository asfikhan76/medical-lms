import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { SidebarProvider } from '@contexts/SidebarContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// subject imports
import AddSubject from '@pages/admin/Subject/create'
import EditSubject from '@pages/admin/Subject/edit'
import AllSubjects from '@pages/admin/Subject/index'

// system imports
import AddSystem from '@pages/admin/System/create'
import EditSystem from '@pages/admin/System/edit'
import AllSystems from '@pages/admin/System/index'

// Subsystem imports
import AddSubsystem from '@pages/admin/Subsystem/create'
import EditSubsystem from '@pages/admin/Subsystem/edit'
import AllSubsystems from '@pages/admin/Subsystem/index'

// topic imports
import AddTopic from '@pages/admin/Topic/create'
import EditTopic from '@pages/admin/Topic/edit'
import AllTopics from '@pages/admin/Topic/index'

// question imports
import AddQuestion from '@pages/admin/Question/create'
import AllQuestions from '@pages/admin/Question/index'
import ShowQuestion from '@pages/admin/Question/show'
import EditQuestion from '@pages/admin/Question/edit'

// Admin import
import AdminDashboard from '@pages/admin/AdminDashboard'
import AdminRoutes from '@auth/AdminRoutes'
import AdminLayout from './layouts/AdminLayout';
import AllUsers from '@pages/admin/Users/index'
import EditUser from '@pages/admin/Users/EditUser'

// contexts
import { AuthProvider } from '@contexts/AuthContext'

// Auth imports
import Register from "@auth/Register";
import Login from "@auth/Login";

// auth imports
import AuthLayout from "@layouts/AuthLayout";
import RedirectIfAuth from '@auth/RedirectIfAuth'
import ProtectedRoute from '@auth/ProtectedRoute'

// student imports  
import StudentDashboard from "@pages/student/StudentDashboard"
import StudentRoutes from '@auth/StudentRoutes'
import StudentLayout from './layouts/StudentLayout';


// plan imports
import Plan from '@pages/student/Plan';

// Test imports
import Test from '@pages/student/Test';

// dashboard imports
import DashboardRedirect from "@auth/DashboardRedirect"


export default function App() {
    return (
        <SidebarProvider>
            <AuthProvider>
                <Router>
                    <Routes>

                        {/* Root redirect to appropriate dashboard */}
                        <Route path="/" element={<DashboardRedirect />} />

                        {/**************************** Auth Routes ****************************/}

                        <Route element={<RedirectIfAuth />}>
                            <Route element={<AuthLayout />}>
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                            </Route>
                        </Route>

                        {/**************************** Admin Routes ****************************/}

                        <Route element={<ProtectedRoute />}>
                            <Route element={<AdminRoutes />}>
                                <Route element={<AdminLayout />}>

                                    {/*Admin Dashboard Route */}
                                    <Route path='/admin/dashboard' element={<AdminDashboard />} />

                                    {/*Subjects Routes  */}
                                    <Route path='/admin/add-subject' element={<AddSubject />} />
                                    <Route path='/admin/edit-subject/:id' element={<EditSubject />} />
                                    <Route path='/admin/all-subjects' element={<AllSubjects />} />

                                    {/* Systems Routes */}
                                    <Route path='/admin/add-system' element={<AddSystem />} />
                                    <Route path='/admin/edit-system/:id' element={<EditSystem />} />
                                    <Route path='/admin/all-systems' element={<AllSystems />} />

                                    {/* SubSytem Routes */}
                                    <Route path='/admin/add-subsystem' element={<AddSubsystem />} />
                                    <Route path='/admin/edit-subsystem/:id' element={<EditSubsystem />} />
                                    <Route path='/admin/all-subsystems' element={<AllSubsystems />} />

                                    {/* Topics Routes */}
                                    <Route path='/admin/add-topic' element={<AddTopic />} />
                                    <Route path='/admin/edit-topic/:id' element={<EditTopic />} />
                                    <Route path='/admin/all-topics' element={<AllTopics />} />

                                    {/* Question Routes */}
                                    <Route path='/admin/add-question' element={<AddQuestion />} />
                                    <Route path='/admin/all-questions' element={<AllQuestions />} />
                                    <Route path='/admin/show-question/:id' element={<ShowQuestion />} />
                                    <Route path='/admin/edit-question/:id' element={<EditQuestion />} />


                                    {/* User Routes */}
                                    <Route path='/admin/all-users' element={<AllUsers />} />
                                    <Route path='/admin/edit-user' element={<EditUser />} />

                                </Route>
                            </Route>
                        </Route>

                        {/**************************** Student Routes ****************************/}

                        <Route element={<ProtectedRoute />}>
                            <Route element={<StudentRoutes />}>
                                <Route element={<StudentLayout />}>

                                    {/*Student Dashboard Route */}
                                    <Route path='/student/dashboard' element={<StudentDashboard />} />

                                    {/*Plan Routes  */}
                                    <Route path='/student/plan' element={<Plan />} />

                                    {/*Tests Routes  */}
                                    <Route path='/student/tests' element={<Test />} />

                                </Route>
                            </Route>
                        </Route>
                    </Routes>

                    {/*<AppContent/>*/}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2500}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored" // Use the colored theme for vibrant toasts
                        toastClassName="custom-toast"
                        bodyClassName="custom-toast-body" />

                </Router>
            </AuthProvider>
        </SidebarProvider >
    )
}