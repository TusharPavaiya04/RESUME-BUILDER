const Banner = () => {
    return (
       <div className="w-full py-2.5 font-medium text-sm text-center"
     style={{ background: '#F8FAFC', borderTop: '3px solid #2563EB',
              borderBottom: '0.5px solid #e2e8f0' }}>
  <p className="flex items-center justify-center gap-2.5 m-0">
    <span style={{ padding: '3px 10px', borderRadius: 6, fontSize: 12,
                   background: '#2563EB', color: '#fff' }}>New</span>
    <span style={{ color: '#0F172A' }}>AI Feature Added</span>
  </p>
</div>
    );
}

export default Banner;