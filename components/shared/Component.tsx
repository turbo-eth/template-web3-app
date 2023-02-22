// @ts-nocheck
import React, { ReactElement, ReactNode } from 'react'

export function isClassComponent(component: unknown) {
  return typeof component === 'function' && !!component.prototype && component.prototype.isReactComponent
}

export function isFunctionComponent(component: any) {
  return typeof component === 'function' && String(component).includes('return React.createElement')
}

export function isInlineFunctionComponent(component: any) {
  return typeof component === 'function'
}

export function isReactComponent(component: any) {
  return !!(isClassComponent(component) || isFunctionComponent(component) || isInlineFunctionComponent(component))
}

export function isElement(element) {
  return React.isValidElement(element)
}

export function isDOMTypeElement(element) {
  return isElement(element) && typeof element.type === 'string'
}

export function isCompositeTypeElement(element) {
  return isElement(element) && typeof element.type === 'export function'
}

export const Component = (component: ReactElement | ReactNode, props: any): React.ReactNode => {
  return isReactComponent(component) ? React.createElement(component, props) : isElement(component) ? React.cloneElement(component, props) : <></>
}

export default Component
