import dayjs from 'dayjs'
// @ts-ignore
import { strChineseFirstPY } from './chineseFirstPY'

export function verifyPhone(phoneNumber) {
	const reg = new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)
	return reg.test(phoneNumber)
}

/**
 * 判断一个对象 || 数组 || 字符串(包括空格) 是否为空
 * @example null、undefined、'undefined'、[]、''、' '
 * @param value
 * @return {boolean}
 */
export function isEmpty(value) {
	if (value === null || value === undefined || value === 'undefined') {
		return true
	} else if (Array.isArray(value)) {
		return value.length === 0
	} else if (typeof value === 'string') {
		return value.trim().length === 0
	} else {
		return false
	}
}

/**
 * 解析日期
 * @param date
 * @param format
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
	if (isEmpty(date)) {
		return undefined
	} else {
		return dayjs(date).format(format)
	}
}

export function getFileSuffix(fileName) {
	let fileSuffix = ''
	if (fileName == null || fileName === '') return fileSuffix
	const files = fileName.split('.')
	if (files.length > 1) fileSuffix = files[files.length - 1]
	return fileSuffix
}

export function loadFileIcon(fileName) {
	const fileSuffix = getFileSuffix(fileName)
	switch (fileSuffix) {
		case 'exe':
			return require('@/static/file-icon/exe.png')
		case 'doc':
		case 'docx':
			return require('@/static/file-icon/word.png')
		case 'xls':
		case 'xlsx':
			return require('@/static/file-icon/excel.png')
		case 'ppt':
		case 'pptx':
			return require('@/static/file-icon/ppt.png')
		case 'pdf':
			return require('@/static/file-icon/pdf.png')
		case 'apk':
			return require('@/static/file-icon/android.png')
		case 'zip':
		case 'rar':
			return require('@/static/file-icon/compress.png')
		case 'txt':
		case 'text':
			return require('@/static/file-icon/txt.png')
		default:
			return require('@/static/file-icon/other.png')
	}
}

export function renderSize(filesize) {
	if (filesize == null || filesize == '') {
		return '0 Bytes'
	}
	const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	let index = 0
	const srcsize = parseFloat(filesize)
	index = Math.floor(Math.log(srcsize) / Math.log(1024))
	let size: any = srcsize / Math.pow(1024, index)
	size = size.toFixed(2) // 保留的小数位数
	return size + unitArr[index]
}

// 获取中文字符串拼音首字母
export function getChineseHeadLetter(str, toUpper = false) {
	if (typeof str !== 'string') return
	let ch = str.charAt(0)
	let s = checkCh(ch)
	if (toUpper) return s.toUpperCase()
	else return s.toLowerCase()
}

export function checkCh(ch) {
	let uni = ch.charCodeAt(0)
	if (uni > 40869 || uni < 19968) return ch
	return strChineseFirstPY.charAt(uni - 19968)
}

// 生成26个英文字母数组
export function generateLetterArray(toUpper = false) {
	let code = toUpper ? 65 : 97
	return new Array(26).fill(null).map((v, i) => String.fromCharCode(code + i))
}
