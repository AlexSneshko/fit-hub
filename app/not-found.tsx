"use client"

import Link from 'next/link'

import React from 'react'

const NotFound = () => {
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-gray-900">404</h1>
              <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
              <p className="mt-4 text-gray-500">
                Sorry, the page you are looking for does not exist.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => window.history.back()}
                  className="px-4 py-2 mr-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Go Back
                </button>
                <Link href="/" className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                  {/* <a className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"> */}
                    Go to Home
                </Link>
              </div>
            </div>
          </div>
          </div>
          )
}

export default NotFound