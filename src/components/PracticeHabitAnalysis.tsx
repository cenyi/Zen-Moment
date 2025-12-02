'use client'

import { useState, useEffect } from 'react'
import { HabitAnalysisResult } from '../utils/habitAnalysisCalculations'

interface PracticeHabitAnalysisProps {
  habitAnalysis?: HabitAnalysisResult | null
  theme: 'dark' | 'light'
}

export const PracticeHabitAnalysis = ({ habitAnalysis, theme }: PracticeHabitAnalysisProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle cases where habitAnalysis data is not available yet
  if (!mounted || !habitAnalysis) {
    return (
      <div className={`p-6 rounded-2xl ${
        theme === 'dark'
          ? 'neumorphic-dark border border-gray-600/35'
          : 'neumorphic border border-gray-400/40'
      }`}>
        <div className="animate-pulse">
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return theme === 'dark' ? 'text-green-400' : 'text-green-600'
    if (score >= 60) return theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
    if (score >= 40) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
    return theme === 'dark' ? 'text-red-400' : 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return theme === 'dark' ? 'bg-green-400/20' : 'bg-green-100/50'
    if (score >= 60) return theme === 'dark' ? 'bg-blue-400/20' : 'bg-blue-100/50'
    if (score >= 40) return theme === 'dark' ? 'bg-yellow-400/20' : 'bg-yellow-100/50'
    return theme === 'dark' ? 'bg-red-400/20' : 'bg-red-100/50'
  }

  return (
    <div className={`p-6 rounded-2xl ${
      theme === 'dark'
        ? 'neumorphic-dark border border-gray-600/20'
        : 'neumorphic border border-gray-400/25'
    }`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          🧠 Practice Habit Analysis
        </h2>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
          theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'
        }`}>
          <span className={`text-lg font-semibold ${getScoreColor(habitAnalysis.habitInsights.habitScore)}`}>
            {habitAnalysis.habitInsights.personalityType}
          </span>
        </div>
        <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          Overall Habit Score: {habitAnalysis.habitInsights.habitScore}/100
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(habitAnalysis.practiceConsistency.practiceRegularity)}`}>
            {habitAnalysis.practiceConsistency.practiceRegularity}%
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Consistency Score
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className={`h-full transition-all duration-1000 ease-out ${getScoreBgColor(habitAnalysis.practiceConsistency.practiceRegularity)}`}
              style={{ width: `${habitAnalysis.practiceConsistency.practiceRegularity}%` }}
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-2xl font-bold mb-1 ${getScoreColor(habitAnalysis.practiceTypePreference.balanceScore)}`}>
            {habitAnalysis.practiceTypePreference.balanceScore}%
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Balance Score
          </div>
          <div className={`mt-2 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-300 border border-gray-400/50'}`}>
            <div
              className={`h-full transition-all duration-1000 ease-out ${getScoreBgColor(habitAnalysis.practiceTypePreference.balanceScore)}`}
              style={{ width: `${habitAnalysis.practiceTypePreference.balanceScore}%` }}
            />
          </div>
        </div>

        <div className={`p-4 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} text-center`}>
          <div className={`text-2xl font-bold mb-1 capitalize ${
            theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
          }`}>
            {habitAnalysis.practiceConsistency.preferredFrequency}
          </div>
          <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
            Practice Frequency
          </div>
        </div>
      </div>

      {/* Detailed Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Time Preference */}
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            ⏰ Time of Day Preference
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Most Preferred
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {habitAnalysis.timeOfDayPreference.mostPreferred.period}
              </span>
            </div>
            <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
              {habitAnalysis.timeOfDayPreference.mostPreferred.timeRange} ({habitAnalysis.timeOfDayPreference.mostPreferred.percentage}%)
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between items-center">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Early Morning
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.timeOfDayPreference.earlyMorning}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Late Morning
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.timeOfDayPreference.lateMorning}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Afternoon
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.timeOfDayPreference.afternoon}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Evening
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.timeOfDayPreference.evening}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Session Duration */}
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            ⏱️ Session Duration Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Average Duration
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                {Math.round(habitAnalysis.sessionDurationAnalysis.averageDuration / 60)}m
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Preferred Length
              </span>
              <span className={`font-semibold capitalize ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {habitAnalysis.sessionDurationAnalysis.preferredDuration}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Duration Trend
              </span>
              <span className={`font-semibold capitalize ${
                habitAnalysis.sessionDurationAnalysis.durationTrend === 'increasing' ?
                  (theme === 'dark' ? 'text-green-400' : 'text-green-600') :
                  habitAnalysis.sessionDurationAnalysis.durationTrend === 'decreasing' ?
                  (theme === 'dark' ? 'text-red-400' : 'text-red-600') :
                  (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
              }`}>
                {habitAnalysis.sessionDurationAnalysis.durationTrend}
              </span>
            </div>
            <div className={`pt-2 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-400/60'
            }`}>
              <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Session Categories
              </div>
              <div className="flex justify-between mt-1">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Short (&lt;5m)
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.sessionDurationAnalysis.durationCategories.short}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Medium (5-15m)
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.sessionDurationAnalysis.durationCategories.medium}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  Long (&gt;15m)
                </span>
                <span className={`text-xs ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
                  {habitAnalysis.sessionDurationAnalysis.durationCategories.long}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Practice Type Preference */}
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            🧘‍♂️ Practice Type Preference
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Meditation
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {habitAnalysis.practiceTypePreference.meditationPercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Breathing
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {habitAnalysis.practiceTypePreference.breathingPercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Preferred Type
              </span>
              <span className={`font-semibold capitalize ${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              }`}>
                {habitAnalysis.practiceTypePreference.preferredType}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Mixed Practice Days
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                {habitAnalysis.practiceTypePreference.crossPracticeDays}
              </span>
            </div>
            <div className="mt-3">
              <div className={`text-xs ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'} mb-1`}>
                Balance Distribution
              </div>
              <div className={`h-4 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300 border border-gray-400/50'}`}>
                <div className="h-full flex">
                  <div
                    className="bg-blue-500 transition-all duration-1000 ease-out"
                    style={{ width: `${habitAnalysis.practiceTypePreference.meditationPercentage}%` }}
                  />
                  <div
                    className="bg-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: `${habitAnalysis.practiceTypePreference.breathingPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consistency Analysis */}
        <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
            📈 Consistency Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Average Gap
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
              }`}>
                {habitAnalysis.practiceConsistency.averageGap} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Longest Gap
              </span>
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                {habitAnalysis.practiceConsistency.longestGap} days
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                Consistency Trend
              </span>
              <span className={`font-semibold capitalize ${
                habitAnalysis.practiceConsistency.consistencyTrend === 'improving' ?
                  (theme === 'dark' ? 'text-green-400' : 'text-green-600') :
                  habitAnalysis.practiceConsistency.consistencyTrend === 'declining' ?
                  (theme === 'dark' ? 'text-red-400' : 'text-red-600') :
                  (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
              }`}>
                {habitAnalysis.practiceConsistency.consistencyTrend}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Insights */}
      <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'} mb-6`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          💡 Personalized Insights
        </h3>

        {/* Strengths */}
        {habitAnalysis.habitInsights.strengths.length > 0 && (
          <div className="mb-4">
            <h4 className={`text-sm font-semibold mb-2 text-green-600 dark:text-green-400`}>
              ✨ Your Strengths
            </h4>
            <ul className="space-y-1">
              {habitAnalysis.habitInsights.strengths.map((strength, index) => (
                <li key={index} className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  • {strength}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Areas for Improvement */}
        {habitAnalysis.habitInsights.areasForImprovement.length > 0 && (
          <div className="mb-4">
            <h4 className={`text-sm font-semibold mb-2 text-orange-600 dark:text-orange-400`}>
              🎯 Areas for Improvement
            </h4>
            <ul className="space-y-1">
              {habitAnalysis.habitInsights.areasForImprovement.map((area, index) => (
                <li key={index} className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  • {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        {habitAnalysis.habitInsights.recommendations.length > 0 && (
          <div>
            <h4 className={`text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400`}>
              🚀 Personalized Recommendations
            </h4>
            <ul className="space-y-1">
              {habitAnalysis.habitInsights.recommendations.map((recommendation, index) => (
                <li key={index} className={`text-sm ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  • {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Day of Week Pattern */}
      <div className={`p-6 rounded-xl ${theme === 'dark' ? 'neumorphic-dark-inset' : 'neumorphic-inset'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'}`}>
          📅 Weekly Practice Pattern
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
            const practiceCount = habitAnalysis.practicePattern.dayOfWeekPattern[index]
            const maxPractice = Math.max(...habitAnalysis.practicePattern.dayOfWeekPattern)
            const intensity = maxPractice > 0 ? (practiceCount / maxPractice) : 0

            return (
              <div key={index} className="text-center">
                <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
                  {day}
                </div>
                <div
                  className={`h-12 rounded flex items-center justify-center text-xs font-semibold shadow-sm ${
                    intensity > 0.7 ? 'bg-green-500 text-white' :
                    intensity > 0.4 ? 'bg-blue-500 text-white' :
                    intensity > 0 ? 'bg-yellow-500 text-white' :
                    theme === 'dark' ? 'bg-gray-700 text-gray-400 border border-gray-600/50' : 'bg-gray-300 text-gray-600 border border-gray-400/50'
                  }`}
                >
                  {practiceCount}
                </div>
              </div>
            )
          })}
        </div>
        <div className={`text-xs mt-3 ${theme === 'dark' ? 'text-neumorphic-muted-dark' : 'text-neumorphic-muted-light'}`}>
          Weekly Trend: <span className={`font-semibold capitalize ${
            habitAnalysis.practicePattern.weeklyTrend === 'increasing' ?
              (theme === 'dark' ? 'text-green-400' : 'text-green-600') :
              habitAnalysis.practicePattern.weeklyTrend === 'decreasing' ?
              (theme === 'dark' ? 'text-red-400' : 'text-red-600') :
              (theme === 'dark' ? 'text-blue-400' : 'text-blue-600')
          }`}>{habitAnalysis.practicePattern.weeklyTrend}</span>
        </div>
      </div>
    </div>
  )
}