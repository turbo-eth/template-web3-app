import { MouseEventHandler, useState } from 'react'

import classNames from 'classnames'
import { animated, useSpring } from 'react-spring'
// @ts-ignore
import useKeypress from 'react-use-keypress'

import { RainbowKit } from '@/providers/RainbowKit'

interface IModalDynamic {
  children: any
  className?: string
  hideModal: Function | MouseEventHandler
}

export const ModalDynamic = ({ children, className, hideModal }: IModalDynamic) => {
  const [show, setShow] = useState(false)

  // Animate Background
  const animateBackground = useSpring({
    from: {
      background: '#000',
      opacity: 0,
    },
    to: {
      opacity: 0.25,
    },
    reverse: show,
    delay: 0,
  })

  // Animate Panel
  const animatePanel = useSpring({
    from: { opacity: 0, transform: 'translate3d(0px, 250px, 0px)' },
    to: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0px, 0px, 0px)' },
    leave: { opacity: 0, transform: 'translate3d(0px, 250px, 0px)' },
    reverse: show,
    delay: 100,
  })

  // Style Panel
  const classesPanel = classNames('absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ', 'z-50 ', className)

  const handleCloseModal = (event: any) => {
    setShow(true)
    setTimeout(() => {
      hideModal(event)
    }, 400)
  }

  useKeypress('Escape', (event: any) => {
    setShow(true)
    setTimeout(() => {
      hideModal(event)
    }, 400)
  })

  return (
    <>
      <RainbowKit>
        <animated.div onClick={handleCloseModal} className={'fixed inset-0 z-10'} style={{ ...animateBackground, zIndex: 999 }} />
        <div className={classesPanel} style={{ zIndex: 1000 }}>
          <animated.div className={''} style={{ ...animatePanel, zIndex: 1000 }}>
            <div className="absolute top-3 right-3">
              <span onClick={handleCloseModal} className="cursor-pointer">
                Close
              </span>
            </div>
            {children}
          </animated.div>
        </div>
      </RainbowKit>
    </>
  )
}

ModalDynamic.defaultProps = {
  className: '',
}

export default ModalDynamic
