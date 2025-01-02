

function Loading() {
    setTimeout(() => {
        const loading = document.querySelector('.load');
        if (loading?.classList.contains('flex')) {
            loading.classList.remove('flex')
            loading.classList.add('hidden')
        }
    }, 2000);
    return (
        <>
            <div className="load absolute z-50 bg-orange-400 w-full h-screen flex justify-center items-center">
                <img src="/images/logo2.png" alt="logo2.png" width={200} height={200} />
            </div>
        </>
    )    
}

export default Loading;