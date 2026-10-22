import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Home, IndianRupee, CalendarCheck, ChartNoAxesColumn, Users, Bell, Search, Plus, MoreHorizontal, MessageCircle, ChevronRight, Check, X, Clock3, BookOpen, Phone, Pencil, Trash2, ArrowUpRight, Wallet, GraduationCap, Menu, CircleHelp, CheckCircle2, UserRound, ClipboardList, Send, CalendarDays } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import './styles.css'

const initialStudents = [
  {id:1,name:'Aarav S.',phone:'919876543210',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:0,late:12,attendance:92,status:'P'},
  {id:2,name:'Diya K.',phone:'919876543211',className:'Class 9 · Science',batch:'Class 9 · Science',fee:3000,paid:0,late:9,attendance:88,status:'A'},
  {id:3,name:'Rohan V.',phone:'919876543212',className:'Class 12 · Physics',batch:'Class 12 · Physics',fee:4500,paid:0,late:5,attendance:96,status:'P'},
  {id:4,name:'Meera P.',phone:'919876543213',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:0,late:3,attendance:90,status:'P'},
  {id:5,name:'Kabir J.',phone:'919876543214',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:0,late:0,attendance:96,status:'P'},
  {id:6,name:'Sara N.',phone:'919876543215',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:3500,late:0,attendance:86,status:'A'},
  {id:7,name:'Ishaan V.',phone:'919876543216',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:3500,late:0,attendance:100,status:'P'},
  {id:8,name:'Tanya B.',phone:'919876543217',className:'Class 10 · Maths',batch:'Class 10 · Maths',fee:3500,paid:0,late:0,attendance:100,status:'P'}
]
const initialBatches = [
 {id:1,name:'Class 10 · Maths',time:'5:00 PM',subject:'Maths'},
 {id:2,name:'Class 9 · Science',time:'4:00 PM',subject:'Science'},
 {id:3,name:'Class 12 · Physics',time:'6:30 PM',subject:'Physics'}
]
const tests = [{name:'T1',marks:23},{name:'T2',marks:29},{name:'T3',marks:31},{name:'T4',marks:35},{name:'T5',marks:38},{name:'T6',marks:42}]
const initialEnquiries = [{id:1,name:'Neha B.',ref:'Referred by Aarav S. · Class 9',status:'Demo class'},{id:2,name:'Yash K.',ref:'Referred by Diya K. · Class 10',status:'Call today'}]
const money = n => '₹' + Number(n).toLocaleString('en-IN')
const wa = (phone, message) => `https://wa.me/${String(phone||'').replace(/\D/g,'')}?text=${encodeURIComponent(message)}`
const safePhone = p => String(p||'').replace(/\D/g,'')
function App(){
 const [tab,setTab] = useState('Fees')
 const [students,setStudents] = useState(()=>{try{return JSON.parse(localStorage.getItem('td_students'))||initialStudents}catch{return initialStudents}})
 const [batches,setBatches] = useState(()=>{try{return JSON.parse(localStorage.getItem('td_batches'))||initialBatches}catch{return initialBatches}})
 const [attendance,setAttendance] = useState(()=>{try{return JSON.parse(localStorage.getItem('td_attendance'))||{}}catch{return {}}})
 const [enquiries,setEnquiries] = useState(()=>{try{return JSON.parse(localStorage.getItem('td_enquiries'))||initialEnquiries}catch{return initialEnquiries}})
 const [query,setQuery] = useState('')
 const [batchFilter,setBatchFilter] = useState('Class 10 · Maths')
 const [modal,setModal] = useState('')
 const [editing,setEditing] = useState(null)
 const [toast,setToast] = useState('')
 const [homework,setHomework] = useState([true,false,false])
 const [paid,setPaid] = useState(false)
 const [parentStudent,setParentStudent] = useState(1)
 const [menuOpen,setMenuOpen] = useState(false)
 useEffect(()=>localStorage.setItem('td_students',JSON.stringify(students)),[students])
 useEffect(()=>localStorage.setItem('td_batches',JSON.stringify(batches)),[batches])
 useEffect(()=>localStorage.setItem('td_attendance',JSON.stringify(attendance)),[attendance])
 useEffect(()=>localStorage.setItem('td_enquiries',JSON.stringify(enquiries)),[enquiries])
 useEffect(()=>{if(toast){const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)}},[toast])
 const pendingStudents = students.filter(s=>s.fee>s.paid)
 const pendingTotal = pendingStudents.reduce((a,s)=>a+s.fee-s.paid,0)
 const filteredStudents = students.filter(s=>(s.name+' '+s.className).toLowerCase().includes(query.toLowerCase()))
 const selectedParent = students.find(s=>s.id===Number(parentStudent))||students[0]
 const markStatus = id => attendance[id] || students.find(s=>s.id===id)?.status || 'P'
 const setMark = (id,val)=>setAttendance(p=>({...p,[id]:val}))
 const openWhatsApp = (phone,message)=>window.open(wa(phone,message),'_blank','noopener,noreferrer')
 const remindAll = ()=>{if(!pendingStudents.length){setToast('Sabki fees clear hai 🎉');return} pendingStudents.forEach((s,i)=>setTimeout(()=>openWhatsApp(s.phone,`Namaste! 🙏 ${s.name} ki tuition fee ${money(s.fee-s.paid)} pending hai (${s.late||1} din late). Kripya payment kar dein. Dhanyavaad! — TuitionDesk`),i*350))}
 const sendAbsent = ()=>{const absent=students.filter(s=>s.batch===batchFilter && markStatus(s.id)==='A');if(!absent.length){setToast('Koi absent student nahi hai');return} absent.forEach((s,i)=>setTimeout(()=>openWhatsApp(s.phone,`Namaste Parent ji, aaj ${s.name} ${s.batch} class mein absent the. Kripya unki attendance note kar lein. — TuitionDesk`),i*350));setToast(`${absent.length} absent alert(s) ke liye WhatsApp open ho raha hai`)}
 const sendReport = ()=>{const s=students[0];openWhatsApp(s.phone,`Namaste Parent ji! 📊 ${s.name} ka weekly test report: 42/50 marks, rank 3 of 24. Attendance 94%. T1 se +19 marks improvement. Teacher note: Algebra strong, Geometry pe 2 extra sheets practice karni hain. — TuitionDesk`)}
 const nav = [{name:'Fees',icon:IndianRupee},{name:'Attendance',icon:CalendarCheck},{name:'Tests',icon:ChartNoAxesColumn},{name:'Parent',icon:Users},{name:'Dashboard',icon:Home}]
 const showModal = (type,student=null)=>{setEditing(student);setModal(type)}
 const saveStudent = e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const data={name:fd.get('name').trim(),phone:safePhone(fd.get('phone')),className:fd.get('batch'),batch:fd.get('batch'),fee:Number(fd.get('fee')||0),paid:Number(fd.get('paid')||0),late:Number(fd.get('late')||0),attendance:Number(fd.get('attendance')||90),status:editing?.status||'P'};if(!data.name){setToast('Student name required');return}if(editing)setStudents(p=>p.map(s=>s.id===editing.id?{...s,...data}:s));else setStudents(p=>[...p,{...data,id:Date.now()}]);setModal('');setToast(editing?'Student update ho gaya':'Student add ho gaya')}
 const saveBatch = e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const b={id:editing?.id||Date.now(),name:fd.get('name').trim(),subject:fd.get('subject').trim(),time:fd.get('time')};if(!b.name)return;if(editing)setBatches(p=>p.map(x=>x.id===editing.id?b:x));else setBatches(p=>[...p,b]);setBatchFilter(b.name);setModal('');setToast('Batch save ho gaya')}
 const deleteStudent = id=>{if(confirm('Is student ko delete karna hai?')){setStudents(p=>p.filter(s=>s.id!==id));setToast('Student delete ho gaya')}}
 const updateEnquiry = (id,status)=>{setEnquiries(p=>p.map(e=>e.id===id?{...e,status}:e));setToast('Enquiry update ho gayi')}
 const payFee = ()=>{const s=selectedParent;if(!s){setToast('Pehle student select karein');return}const amount=s.fee-s.paid;if(amount<=0){setPaid(true);setToast('Fees already paid');return}window.location.href=`upi://pay?pa=tuitiondesk@upi&pn=TuitionDesk&am=${amount}&cu=INR&tn=${encodeURIComponent(s.name+' tuition fee')}`;setPaid(true);setToast('UPI app open ho sakti hai. Demo receipt ke liye neeche button use karein.')}
 const receipt = ()=>{const s=selectedParent;openWhatsApp(s.phone,`Payment receipt 🧾\nNamaste! ${s.name} ki tuition fee payment note kar li gayi hai.\nAmount: ${money(s.fee-s.paid)}\nStatus: Demo receipt (payment confirmation verify karein)\n— TuitionDesk`)}
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark"><GraduationCap size={23}/></div><div><b>TuitionDesk</b><small>Teach smarter, every day</small></div></div>
   <div className="side-label">WORKSPACE</div>{nav.map(n=><button key={n.name} className={`side-link ${tab===n.name?'active':''}`} onClick={()=>setTab(n.name)}><n.icon size={19}/><span>{n.name==='Tests'?'Test report':n.name}</span>{n.name==='Fees'&&<span className="side-count">{pendingStudents.length}</span>}</button>)}
   <div className="sidebar-bottom"><div className="teacher-avatar">VK</div><div><b>Vishal Kumar</b><small>Tuition owner</small></div><MoreHorizontal size={18}/></div>
  </aside>
  <main className="main">
   <header className="topbar"><div className="mobile-brand"><div className="brand-mark"><GraduationCap size={20}/></div><b>TuitionDesk</b></div><div className="crumb">Workspace <ChevronRight size={14}/><b>{tab==='Tests'?'Test report':tab}</b></div><div className="top-actions"><button className="icon-btn" onClick={()=>setToast('You are all caught up!')} aria-label="Notifications"><Bell size={19}/><i/></button><div className="top-avatar">VK</div></div></header>
   <div className="page">
    {tab==='Fees'&&<><PageTitle eyebrow="TUITION MANAGEMENT" title="Fees pending" sub="Overview · All batches" action={<button className="btn btn-primary" onClick={()=>showModal('student')}><Plus size={17}/> Add student</button>}/>
      <div className="hero-metrics"><div><span className="hero-kicker"><IndianRupee size={14}/> Pending this month</span><h2>{money(pendingTotal||27500)}</h2><p>{pendingStudents.length||8} students · {batches.length} batches</p></div><div className="hero-illustration"><Wallet size={48}/><span className="float-coin">₹</span></div></div>
      <div className="section-head"><div><h3>Student fee list</h3><p>Fee status ek jagah manage karein</p></div><div className="searchbox"><Search size={16}/><input placeholder="Search student..." value={query} onChange={e=>setQuery(e.target.value)}/></div></div>
      <div className="student-list">{filteredStudents.map(s=><div className="student-row" key={s.id}><Avatar name={s.name}/><div className="student-info"><b>{s.name}</b><span>{s.className}</span><small className={s.fee<=s.paid?'paid-text':'late-text'}>{s.fee<=s.paid?'Fees paid':`${s.late||1} din late`}</small></div><div className="fee-amount"><b>{money(s.fee-s.paid)}</b><small>{s.fee<=s.paid?'Cleared':'Pending'}</small></div><button className="row-menu" onClick={()=>showModal('student',s)} aria-label="Edit student"><MoreHorizontal size={19}/></button></div>)}</div>
      <div className="list-footer"><span>Showing {filteredStudents.length} students</span><button className="text-btn" onClick={()=>showModal('manage')}>Manage batches <ChevronRight size={15}/></button></div>
      <button className="btn btn-whatsapp wide" onClick={remindAll}><MessageCircle size={18}/> WhatsApp reminder – sabko <ArrowUpRight size={16}/></button>
      <p className="helper-note"><CheckCircle2 size={14}/> Har parent ka message alag WhatsApp chat mein open hoga.</p>
    </>}
    {tab==='Attendance'&&<><PageTitle eyebrow="DAILY CLASS TRACKER" title="Attendance" sub="Mark attendance & notify parents" action={<button className="btn btn-outline" onClick={()=>showModal('batch')}><Plus size={16}/> New batch</button>}/>
      <div className="batch-banner"><div className="batch-icon"><CalendarDays size={21}/></div><div className="batch-select-wrap"><b>Class attendance</b><select value={batchFilter} onChange={e=>setBatchFilter(e.target.value)}>{batches.map(b=><option key={b.id} value={b.name}>{b.name}</option>)}</select><small>{batches.find(b=>b.name===batchFilter)?.time||'5:00 PM'} batch · Aaj ki class</small></div><span className="date-pill">Today</span></div>
      <div className="attendance-summary"><div><span>Present</span><b>{students.filter(s=>s.batch===batchFilter&&markStatus(s.id)==='P').length}</b></div><div><span>Absent</span><b className="red-text">{students.filter(s=>s.batch===batchFilter&&markStatus(s.id)==='A').length}</b></div><div><span>Total</span><b>{students.filter(s=>s.batch===batchFilter).length}</b></div></div>
      <div className="section-head"><div><h3>Students</h3><p>Present (P) ya Absent (A) select karein</p></div><span className="date-label">22 Oct 2026</span></div>
      <div className="student-list attendance-list">{students.filter(s=>s.batch===batchFilter).map(s=><div className="student-row" key={s.id}><Avatar name={s.name}/><div className="student-info"><b>{s.name}</b><span>{s.attendance}% attendance</span><div className="mini-track"><i style={{width:`${s.attendance}%`}}/></div></div><div className="toggle-group"><button className={markStatus(s.id)==='P'?'selected present':''} onClick={()=>setMark(s.id,'P')}>P</button><button className={markStatus(s.id)==='A'?'selected absent':''} onClick={()=>setMark(s.id,'A')}>A</button></div></div>)}</div>
      <button className="btn btn-primary wide save-attendance" onClick={()=>{localStorage.setItem('td_attendance',JSON.stringify(attendance));sendAbsent()}}><Check size={18}/> Save + absent alert to parents</button><p className="helper-note"><MessageCircle size={14}/> Absent students ke parents ko WhatsApp message open hoga.</p>
    </>}
    {tab==='Tests'&&<><PageTitle eyebrow="PERFORMANCE INSIGHTS" title="Test report" sub="Weekly student progress at a glance" action={<button className="btn btn-outline" onClick={()=>setToast('Test report is ready to share')}><ClipboardList size={16}/> Export report</button>}/>
      <div className="report-student"><Avatar name="Aarav S." large/><div><h3>Aarav S.</h3><p>Class 10 · Maths <span className="dot"/> Weekly test</p></div><button className="icon-btn" onClick={()=>setToast('Showing latest test report')}><MoreHorizontal size={20}/></button></div>
      <div className="test-score-card"><div><span className="muted-white">THIS WEEK</span><div className="big-score">42<span>/50</span></div><div className="score-track"><i/></div><small>Great progress! Keep it up 🎉</small></div><div className="rank-box"><span>CLASS RANK</span><b>3 <small>of 24</small></b><span className="rank-up">↑ 2 positions</span></div></div>
      <div className="chart-card"><div className="card-heading"><div><h3>Test performance</h3><p>Last 6 tests · Out of 50</p></div><span className="trend-pill">↗ +19 marks</span></div><div className="chart-area"><ResponsiveContainer width="100%" height="100%"><BarChart data={tests} margin={{top:8,right:0,left:-24,bottom:0}}><CartesianGrid vertical={false} stroke="#EEF2F7" strokeDasharray="3 3"/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize:11,fill:'#94A3B8'}}/><YAxis domain={[0,50]} axisLine={false} tickLine={false} tick={{fontSize:10,fill:'#94A3B8'}}/><Tooltip formatter={v=>[`${v}/50`,'Marks']} cursor={{fill:'#F1F5F9'}}/><Bar dataKey="marks" fill="#2563EB" radius={[6,6,2,2]} maxBarSize={32}/></BarChart></ResponsiveContainer></div></div>
      <div className="stat-grid"><Stat icon={ArrowUpRight} label="Improvement" value="+19 marks" hint="Since T1" color="blue"/><Stat icon={CalendarCheck} label="Attendance" value="94%" hint="This month" color="green"/></div>
      <div className="teacher-note"><div className="note-icon"><BookOpen size={17}/></div><div><b>Teacher's note</b><p>Algebra strong. Geometry pe 2 extra sheets practice karni hain.</p><small>Updated today · Vishal Sir</small></div><Pencil size={15} className="note-edit"/></div>
      <button className="btn btn-whatsapp wide" onClick={sendReport}><MessageCircle size={18}/> Report parent ko bhejo <ArrowUpRight size={16}/></button>
    </>}
    {tab==='Parent'&&<><PageTitle eyebrow="PARENT VIEW PREVIEW" title="Parent app" sub="Parents ko dikhega unke child ka progress" action={<select className="select-compact" value={parentStudent} onChange={e=>{setParentStudent(e.target.value);setPaid(false)}}>{students.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>}/>
      {selectedParent&&<><div className="parent-welcome"><div className="parent-blue-shape"/><div className="parent-profile"><Avatar name={selectedParent.name} large/><div><span>WELCOME BACK 👋</span><h2>{selectedParent.name}</h2><p>{selectedParent.batch} · Student portal</p></div></div><div className="parent-mini-stats"><div><span>Attendance</span><b>{selectedParent.attendance}%</b></div><div><span>Last test</span><b>38/50</b></div><div><span>Next class</span><b>5:00 PM</b></div></div></div>
      <div className="section-head"><div><h3>Homework</h3><p>Daily practice, little by little</p></div><span className="count-pill">{homework.filter(Boolean).length}/3 done</span></div>
      <div className="homework-card">{['Ex 4.2 · Q1 to Q10','Ex 4.3 · Q1 to Q6','Revise algebra formulas'].map((h,i)=><label className="homework-item" key={h}><input type="checkbox" checked={homework[i]} onChange={e=>setHomework(p=>p.map((v,j)=>i===j?e.target.checked:v))}/><span className={homework[i]?'homework-done':''}>{h}</span>{homework[i]&&<CheckCircle2 size={16} className="green-text"/>}</label>)}</div>
      <div className="section-head fee-head"><div><h3>Fee details</h3><p>October 2026 · Tuition fee</p></div><span className="status-chip">{paid?'Payment initiated':'Pending'}</span></div>
      <div className="parent-fee-card"><div className="fee-card-top"><div><span>AMOUNT DUE</span><h2>{money(Math.max(0,selectedParent.fee-selectedParent.paid))}</h2><small>{selectedParent.late||12} din late · Please pay soon</small></div><div className="fee-icon"><IndianRupee size={25}/></div></div><div className="fee-detail-line"><span>Monthly tuition fee</span><b>{money(selectedParent.fee)}</b></div><div className="fee-detail-line"><span>Paid this month</span><b>{money(selectedParent.paid)}</b></div><button className="btn btn-primary wide" onClick={payFee}><Wallet size={17}/> Pay by UPI <ArrowUpRight size={16}/></button><p className="secure-note"><CheckCircle2 size={13}/> Secure UPI app · Demo payment flow</p></div>
      <button className="btn btn-whatsapp wide receipt-btn" onClick={receipt}><MessageCircle size={17}/> WhatsApp receipt generate karein</button>
      <p className="disclaimer">Demo mode: UPI open hona payment confirmation nahi hai. Receipt bhejne se pehle actual payment verify karein.</p></>}
    </>}
    {tab==='Dashboard'&&<><PageTitle eyebrow="YOUR TUITION AT A GLANCE" title="Dashboard" sub="Good evening, Vishal Sir 👋" action={<button className="btn btn-primary" onClick={()=>showModal('student')}><Plus size={17}/> Add student</button>}/>
      <div className="dashboard-hero"><div className="dash-hero-top"><div><span>FEES COLLECTED</span><h2>₹1,48,000</h2><p>84% collected · {money(pendingTotal||27500)} pending</p></div><div className="dash-icon"><Wallet size={25}/></div></div><div className="progress-label"><span>Monthly collection</span><b>84%</b></div><div className="progress-track"><i/></div><div className="hero-bottom-line"><span><i/> Collected</span><span><i/> Pending</span></div></div>
      <div className="dashboard-stats"><Stat icon={Users} label="Students" value={String(students.length||64)} hint="Active learners" color="blue"/><Stat icon={CalendarCheck} label="Attendance" value="91%" hint="This month" color="green"/><Stat icon={MessageCircle} label="New enquiries" value={String(enquiries.length||5)} hint="Need follow-up" color="orange"/></div>
      <div className="section-head enquiries-heading"><div><h3>New enquiries</h3><p>Refer a friend · Follow up karein</p></div><button className="text-btn" onClick={()=>showModal('enquiry')}><Plus size={15}/> Add</button></div>
      <div className="enquiry-list">{enquiries.map((e,i)=><div className="enquiry-row" key={e.id}><div className={`enquiry-avatar av-${i%3}`}>{e.name.split(' ').map(x=>x[0]).join('')}</div><div className="enquiry-info"><b>{e.name}</b><small>{e.ref}</small><span className={`enquiry-status ${e.status==='Demo class'?'status-demo':'status-call'}`}>{e.status}</span></div><div className="enquiry-actions"><button onClick={()=>updateEnquiry(e.id,'Demo class')} className="mini-action demo-action">Demo class</button><button onClick={()=>updateEnquiry(e.id,'Call today')} className="mini-action call-action"><Phone size={12}/> Call today</button></div></div>)}</div>
      <div className="manage-panel"><div><h3>Manage your classes</h3><p>Add, edit or remove students and batches.</p></div><button className="btn btn-outline" onClick={()=>showModal('manage')}>Manage <ChevronRight size={15}/></button></div>
    </>}
   </div>
  </main>
  <nav className="bottom-nav">{nav.map(n=><button key={n.name} onClick={()=>setTab(n.name)} className={tab===n.name?'current':''}><n.icon size={20}/><span>{n.name==='Tests'?'Test report':n.name}</span></button>)}</nav>
  {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
  {modal&&<div className="modal-backdrop" onClick={e=>{if(e.target===e.currentTarget)setModal('')}}><div className="modal"><div className="modal-head"><div><h2>{modal==='student'?(editing?'Edit student':'Add student'):modal==='batch'?(editing?'Edit batch':'Add batch'):modal==='manage'?'Manage students & batches':'Add enquiry'}</h2><p>Details update karein</p></div><button className="icon-btn" onClick={()=>setModal('')}><X size={19}/></button></div>
    {modal==='student'&&<form onSubmit={saveStudent} className="modal-form"><label>Student name<input name="name" required defaultValue={editing?.name||''} placeholder="e.g. Aarav Sharma"/></label><label>Parent WhatsApp number<input name="phone" required inputMode="tel" defaultValue={editing?.phone||''} placeholder="91XXXXXXXXXX"/></label><label>Batch<select name="batch" defaultValue={editing?.batch||batches[0]?.name}>{batches.map(b=><option key={b.id}>{b.name}</option>)}</select></label><div className="form-grid"><label>Monthly fee (₹)<input name="fee" type="number" min="0" required defaultValue={editing?.fee||3500}/></label><label>Paid (₹)<input name="paid" type="number" min="0" defaultValue={editing?.paid||0}/></label></div><div className="form-grid"><label>Days late<input name="late" type="number" min="0" defaultValue={editing?.late||0}/></label><label>Attendance %<input name="attendance" type="number" min="0" max="100" defaultValue={editing?.attendance||90}/></label></div><button className="btn btn-primary wide" type="submit"><Check size={17}/> Save student</button>{editing&&<button type="button" className="btn btn-danger wide" onClick={()=>{deleteStudent(editing.id);setModal('')}}><Trash2 size={16}/> Delete student</button>}</form>}
    {modal==='batch'&&<form onSubmit={saveBatch} className="modal-form"><label>Batch name<input name="name" required defaultValue={editing?.name||''} placeholder="Class 8 · Science"/></label><label>Subject<input name="subject" required defaultValue={editing?.subject||''} placeholder="Science"/></label><label>Class time<input name="time" required defaultValue={editing?.time||'5:00 PM'} placeholder="5:00 PM"/></label><button className="btn btn-primary wide" type="submit">Save batch</button></form>}
    {modal==='manage'&&<div className="manage-modal"><div className="modal-subhead"><h3>Students ({students.length})</h3><button className="text-btn" onClick={()=>showModal('student')}>+ Add student</button></div>{students.map(s=><div className="manage-row" key={s.id}><Avatar name={s.name}/><div><b>{s.name}</b><small>{s.batch}</small></div><button className="icon-btn" onClick={()=>showModal('student',s)}><Pencil size={15}/></button><button className="icon-btn danger-icon" onClick={()=>deleteStudent(s.id)}><Trash2 size={15}/></button></div>)}<div className="modal-subhead batch-subhead"><h3>Batches ({batches.length})</h3><button className="text-btn" onClick={()=>showModal('batch')}>+ Add batch</button></div>{batches.map(b=><div className="manage-row" key={b.id}><div className="batch-icon small"><BookOpen size={17}/></div><div><b>{b.name}</b><small>{b.subject} · {b.time}</small></div><button className="icon-btn" onClick={()=>showModal('batch',b)}><Pencil size={15}/></button><button className="icon-btn danger-icon" onClick={()=>{if(confirm('Batch delete karein?'))setBatches(p=>p.filter(x=>x.id!==b.id))}}><Trash2 size={15}/></button></div>)}</div>}
    {modal==='enquiry'&&<form className="modal-form" onSubmit={e=>{e.preventDefault();const fd=new FormData(e.currentTarget);setEnquiries(p=>[...p,{id:Date.now(),name:fd.get('name'),ref:fd.get('ref')||'New enquiry · Direct',status:'Call today'}]);setModal('');setToast('Enquiry added')}}><label>Student/parent name<input name="name" required placeholder="Name"/></label><label>Reference / details<input name="ref" placeholder="Referred by..."/></label><button className="btn btn-primary wide" type="submit">Add enquiry</button></form>}
   </div></div>}
 </div>
}
function PageTitle({eyebrow,title,sub,action}){return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{sub}</p></div>{action&&<div className="title-action">{action}</div>}</div>}
function Avatar({name,large=false}){const initials=(name||'?').split(' ').filter(Boolean).map(x=>x[0]).join('').replace('.','').slice(0,2);return <div className={`student-avatar ${large?'avatar-large':''} avatar-${(name||'a').charCodeAt(0)%5}`}>{initials}</div>}
function Stat({icon:Icon,label,value,hint,color}){return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={17}/></div><span>{label}</span><b>{value}</b><small>{hint}</small></div>}
createRoot(document.getElementById('root')).render(<App/>)
