import React, { useState, useEffect } from 'react'
import DevicesContainer from './DevicesContainer'
import { makePostRequest } from '../utils/utils'
import DeviceCard from './DeviceCard'
import { io } from 'socket.io-client'

export default function Cameras(props) {
  const [exploreHD_cards, setExploreHD_cards] = useState([])
  const [other_cards, setOther_cards] = useState([])
  const [socket, setSocket] = useState(io())
  console.log('socket', socket)
  const toggleDrawer = () => {
    setOpen(!open)
  }
  const addCard = (device) => {
    if (device.caps.driver) {
      // takes the prevState, and using the `spread` operator
      // appends the new Card to the new array
      // to update the state
      setExploreHD_cards((prevState) => [
        ...prevState,
        <DeviceCard key={exploreHD_cards.length} device={device} />,
      ])
    } else {
      setOther_cards((prevState) => [
        ...prevState,
        <DeviceCard key={other_cards.length} device={device} />,
      ])
    }
  }
  const addDevices = (devices) => {
    for (let device of devices) {
      addCard(device)
    }
  }
  const removeDevice = (device) => {
    let devicePath = device.devicePath
    // modifies state using the "previous state"
    // rather than directly modifying current state variable
    if (device.caps.driver) {
      setExploreHD_cards((prevState) =>
        prevState.filter((card) => {
          return card.props.device.devicePath != devicePath
        })
      )
    } else {
      setOther_cards((prevState) =>
        prevState.filter((card) => {
          return card.props.device.devicePath != devicePath
        })
      )
    }
  }

  useEffect(() => {
    // Add event listeners to handle device connection status updates
    socket.on('connect', () => {
      console.log('connect')
      fetch('/devices')
        .then((response) => response.json())
        .then((devices) => addDevices(devices))
    })
    socket.on('disconnect', () => {
      console.log('disconnect')
      fetch('/devices')
        .then((response) => response.json())
        .then((devices) => {
          for (let device of devices) {
            removeDevice(device)
          }
        })
    })
    socket.on('added', (addedDevices) => {
      console.log('added', addedDevices)
      for (let device of addedDevices) {
        addCard(device)
      }
    })
    socket.on('removed', (removedDevices) => {
      console.log('removed', removedDevices)
      for (let device of removedDevices) {
        removeDevice(device)
      }
    })
  }, [])
  const resetSettings = () => {
    makePostRequest('/resetSettings', {}, () => window.location.reload())
  }

  return (
    <DevicesContainer>
      {exploreHD_cards}
      {other_cards}
    </DevicesContainer>
  )
}
