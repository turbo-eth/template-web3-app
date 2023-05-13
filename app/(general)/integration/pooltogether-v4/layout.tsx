'use client'
import classNames from 'clsx'

export default function GeneralLayout({ children }: any) {
  const classes = classNames('GeneralLayout', 'bg-gradient-dark flex flex-col pb-10 lg:pb-12')
  return (
    <>
      <div className={classes}>
        <main className="flex-center flex flex-1 flex-col md:px-10">{children}</main>
      </div>
    </>
  )
}
