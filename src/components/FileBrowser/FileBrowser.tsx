import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { TextInput, Button, Icon, LoadingSpinner, Gap, Box, DragOrigin, generateThumbnail, Spacer } from '../../internal'
import { Placeholders } from './Placeholders'
import { IconPrefix } from '@fortawesome/fontawesome-common-types'

const LazyThumbnail = ({ file, thumbnailCache }: { file: File, thumbnailCache: any}) => {
  const [src, setSrc] = useState<string | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !src) {
          try {
            const fileName = file.name
            const cachedThumbnail = thumbnailCache.get(fileName)
            if (cachedThumbnail) {
              setSrc(cachedThumbnail)
            } 
            else {
              generateThumbnail(file, (src) => {
                thumbnailCache.set(fileName, src)
                setSrc(src)
              })
              // @ts-ignore
            }
          } 
          catch (error) {
            console.error(error)
          }
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [file, src, thumbnailCache])

  return (
    <S.ThumbnailContainer>
      {!src ? (
        <S.LoadingText ref={imgRef}>Loading...</S.LoadingText>
      ) : (
        <S.Thumbnail ref={imgRef} src={src} alt={file.name} />
      )}
    </S.ThumbnailContainer>
  )
}

interface FolderEntry {
  name: string
  isDirectory: boolean
  entries?: FolderEntry[]
  collapsed?: boolean
  thumbnail?: string
  file?: File
}

interface FolderStructureProps {
  sourceNames: string[]
  selectedSourceName: string
  setPendingSourceToApply: Function // Define the correct type for this function
  setLayerSource: Function // Define the correct type for this function
  handleFileClickProp: (name: string, file: File) => void,
  iconPrefix?: IconPrefix
  // Add other props here if needed
}

/**
 * `FileBrowser` is a component that presents a navigable directory tree, allowing users to browse and select files.
 * It supports expanding and collapsing folders, searching within the structure, and performing actions on file selection.
 * It also integrates with a drag-and-drop system for file operations, and can display thumbnails for visual file types.
 *
 * @component
 * @param {string[]} sourceNames - An array of source names that may correspond to already loaded or initialized files.
 * @param {string} selectedSourceName - The currently selected source name used for highlighting in the UI.
 * @param {function} setPendingSourceToApply - A callback to set a source as pending to be applied.
 * @param {function} setLayerSource - A callback to set the source for a particular layer.
 * @param {function} handleFileClickProp - A function called when a file entry is clicked, with the name and File object as parameters.
 * @param {IconPrefix} [iconPrefix] - Optional prefix for the FontAwesome icons used within the component.
 *
 * @example
 * // FileBrowser with source selection and file click handling
 * <FileBrowser
 *   sourceNames={['source1.mp4', 'source2.jpg']}
 *   selectedSourceName="source2.jpg"
 *   setPendingSourceToApply={(source) => console.log(`Pending source: ${source}`)}
 *   setLayerSource={(layerInfo) => console.log(`Layer source set: ${layerInfo}`)}
 *   handleFileClickProp={(name, file) => console.log(`File clicked: ${name}`, file)}
 *   iconPrefix="fas"
 * />
 */
export const FileBrowser = React.memo(({
  sourceNames, 
  selectedSourceName, 
  setPendingSourceToApply, 
  setLayerSource, 
  handleFileClickProp,
  iconPrefix
}: FolderStructureProps) => {
  const [folderStructure, setFolderStructure] = useState<FolderEntry[]>([])
  const [collapsed, setCollapsed] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedFolderName, setSelectedFolderName] = useState<string>('')

  const [thumbnailCache, _] = useState<Map<string, string>>(new Map())

  const getFolderStructure = useCallback(async (dirHandle: any): Promise<FolderEntry[]> => {
    let structure: FolderEntry[] = []
    for await (const entry of dirHandle.values()) {
      if (entry.kind === 'directory') {
        const subStructure = await getFolderStructure(entry)
        if (subStructure.length > 0) { // Only add directories with subStructure
          structure.push({
            name: entry.name,
            isDirectory: true,
            entries: subStructure,
            collapsed: true,
          })
        }
      } else {
        const fileExtension = entry.name.split('.').pop()?.toLowerCase()
        if (['mp4', 'jpeg', 'jpg', 'png', 'webm', 'gif'].includes(fileExtension)) {
          const file = await entry.getFile()
  
          structure.push({
            name: entry.name,
            isDirectory: false,
            thumbnail: '',
            file,
          })
        }
      }
    }
    return structure
  }, [])

  const handleSelectFolder = useCallback(async () => {
    setLoading(true)
    try {
      // @ts-ignore
      const dirHandle = await window.showDirectoryPicker()
      const structure = await getFolderStructure(dirHandle)
      setFolderStructure(structure)
      setSelectedFolderName(dirHandle.name) // Set the selected folder's name
    } 
    catch (error) {
      console.error(error)
    } 
    finally {
      setLoading(false)
    }
  }, [getFolderStructure])

  const handleCollapseExpandAll = useCallback(() => {
    const newCollapsed = !collapsed
    setCollapsed(newCollapsed)
    setFolderStructure((prevStructure) =>
      prevStructure.map((entry) =>
        entry.isDirectory ? { ...entry, collapsed: newCollapsed } : entry
      )
    )
  }, [collapsed])

  const updateFolderEntry = useCallback((
    structure: FolderEntry[],
    name: string
  ): FolderEntry[] => {
    return structure.map((entry) =>
      entry.name === name
        ? { ...entry, collapsed: !entry.collapsed }
        : entry.isDirectory && entry.entries
        ? { ...entry, entries: updateFolderEntry(entry.entries, name) }
        : entry
    )
  }, [])

  const sortFoldersFirst = (a: any, b: any) => {
    if (a.isDirectory && !b.isDirectory) {
      return -1 // a is a folder, b is a file, so a should come first
    } 
    else if (!a.isDirectory && b.isDirectory) {
      return 1 // a is a file, b is a folder, so b should come first
    } 
    else {
      return a.name.localeCompare(b.name) // both are folders or both are files, sort them by name
    }
  }

  const handleCollapseExpand = useCallback((name: string) => {
    setFolderStructure((prevStructure) => updateFolderEntry(prevStructure, name))
  }, [updateFolderEntry])

  interface CountResult {
    files: number
    folders: number
  }

  const countFilesAndFolders = useCallback((structure: FolderEntry[]): CountResult => {
    let count: CountResult = { files: 0, folders: 0 }
    structure.forEach((entry) => {
      if (entry.isDirectory) {
        count.folders++
        if (entry.entries) {
          const subCount = countFilesAndFolders(entry.entries)
          count.files += subCount.files
          count.folders += subCount.folders
        }
      } 
      else {
        count.files++
      }
    })
    return count
  }, [])

  const handleFileClick = useCallback((name: string, file: File) => {
    if (sourceNames.includes(name)) {
      setLayerSource({index: 0, name })
    }
    else {
      if (handleFileClickProp) {
        handleFileClickProp(name, file)
      }
              // these need to be achieved via props
({ name, id: 'NEED_TO_ADD_ID' })
    }
  }, [sourceNames])

  const isMatchFound = useCallback((structure: FolderEntry[], term: string): boolean => {
    for (const entry of structure) {
      if (entry.name.toLowerCase().includes(term.toLowerCase())) {
        return true
      } 
      else if (entry.isDirectory && entry.entries) {
        if (isMatchFound(entry.entries, term)) {
          return true
        }
      }
    }
    return false
  }, [])

  const filterFolderStructure = useCallback((structure: FolderEntry[]): FolderEntry[] => {
    if (!searchTerm) return structure
  
    return structure.reduce<FolderEntry[]>((acc, entry) => {
      if (entry.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        if (entry.isDirectory && entry.entries && entry.entries.length > 0) {
          const subStructure = filterFolderStructure(entry.entries)
          if (subStructure.length > 0) {
            acc.push({
              ...entry,
              entries: subStructure,
              collapsed: false,
            })
          }
        } 
        else {
          acc.push(entry)
        }
      } 
      else if (entry.isDirectory && entry.entries) {
        const subStructure = filterFolderStructure(entry.entries)
        if (subStructure.length > 0) {
          acc.push({
            ...entry,
            entries: subStructure,
            collapsed: false,
          })
        }
      }
      return acc
    }, [])
  }, [searchTerm])

  const renderFolderStructure = useCallback(
    (structure: FolderEntry[], level: number): JSX.Element[] => {
      const sortedStructure = structure.sort(sortFoldersFirst)
      return sortedStructure.map((entry) => (
        <S.FileEntry key={entry.name} level={level}>
          {entry.isDirectory ? 
            <>
              <S.Name onClick={() => handleCollapseExpand(entry.name)}>
                <S.FolderButton>
                  <Icon icon={entry.collapsed ? 'caret-right' : 'caret-down'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} fixedWidth />
                  <Icon icon={'folder'} iconPrefix={iconPrefix ? iconPrefix : 'fas'} fixedWidth />
                </S.FolderButton>
                {entry.name}/ ({countFilesAndFolders(entry.entries || []).folders} Folders,{' '}
                {countFilesAndFolders(entry.entries || []).files} Files)
              </S.Name>
              {!entry.collapsed && entry.entries && (
                <S.FolderStructure>{renderFolderStructure(entry.entries, level + 1)}</S.FolderStructure>
              )}
            </>
           : <S.File>
              <DragOrigin 
                data={{
                  origin: 'source',
                  file: URL.createObjectURL(entry.file!),
                  name: entry.name,
                  needToInitialize: !sourceNames.includes(entry.name)
                }}
              >
                <S.FileName
                  onClick={() => {
                    handleFileClick(entry.name, entry.file!)
                  }}
                >
                  {
                    entry.file && 
                      <LazyThumbnail 
                        file={entry.file} 
                        thumbnailCache={thumbnailCache} 
                      />
                  }
                  <span>{' '.repeat(level * 2) + entry.name}</span>
                </S.FileName>
              </DragOrigin>
            </S.File>
          }
          {
            entry.name === selectedSourceName &&
              <S.Selected />
          }
        </S.FileEntry>
      ))
    },
    [handleCollapseExpand, countFilesAndFolders, handleFileClick, thumbnailCache, sourceNames, selectedSourceName]
  )

  const filteredStructure = useMemo(() => filterFolderStructure(folderStructure), [
    filterFolderStructure,
    folderStructure,
  ])

  const totalCount = useMemo(() => countFilesAndFolders(folderStructure), [
    countFilesAndFolders,
    folderStructure,
  ])

  return (
    <S.SourceTree>
      <Gap>
        <Box wrap width={'100%'}>
          {
            selectedFolderName ? <S.SelectedFolder>
              <div>/{selectedFolderName}</div>
              <Gap autoWidth><Icon icon='folder' iconPrefix={iconPrefix ? iconPrefix : 'fas'} /><div>{totalCount.folders}</div></Gap>
              <Gap autoWidth><Icon icon='image' iconPrefix={iconPrefix ? iconPrefix : 'fas'} /><div>{totalCount.files}</div></Gap>
              <Button
                text={'Change Folder'}
                onClick={handleSelectFolder}
                compact
                minimal
              />
            </S.SelectedFolder>
            : <S.Initial>
                <Placeholders>
                  <Box mt={-2}>
                    {
                      loading
                        ? <LoadingSpinner />
                        : <Button
                            text={'Select Folder'}
                            onClick={e => {
                              e.stopPropagation()
                              handleSelectFolder()
                            }}
                            icon='folder'
                            iconPrefix={iconPrefix ? iconPrefix : 'fas'}
                          />
                    }
                  </Box>
                </Placeholders>
              </S.Initial>
          }
          <Spacer />
        </Box>
      
        {
          filteredStructure.length > 0 && <>
            <Box width={'100%'}>
              <TextInput
                placeholder="Search"
                compact
                canClear={searchTerm !== ''}
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
                icon='search'
                iconPrefix={iconPrefix ? iconPrefix : 'fas'}
              />
              <Button
                text={collapsed ? 'Expand' : 'Collapse'}
                icon={collapsed ? 'caret-down' : 'caret-right'}
                iconPrefix={iconPrefix ? iconPrefix : 'fas'}
                onClick={handleCollapseExpandAll}
                compact
                minimal
              />
            </Box>
          </>
        }
      </Gap>
  
      {
        !loading && 
          <S.FolderStructure>
            {
              renderFolderStructure(filteredStructure, 0)
            }
          </S.FolderStructure>
      }
    </S.SourceTree>
  )
})

const S = {
  SourceTree: styled.div`
    width: 100%;
  `,

  Initial: styled.div`
    width: 100%;
  `,

  SelectFolderButtonContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  `,

  SelectedFolder: styled.div`
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color);
    display: flex;
    align-items: center;
    gap: 8px;
    padding-left: 4px;
  `,

  ThumbnailContainer: styled.div`
    width: 86px;
    height: 48px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  `,

  Thumbnail: styled.img`
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
  `,

  FolderButton: styled.div`
    /* Add your styles for the folder button here */
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    margin-right: 12px;
    width: 28px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
  `,

  FolderName: styled.span`
    /* Add your styles for the folder name here */
    cursor: pointer;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color);
  `,

  FolderStructure: styled.ul`
    list-style: none ;
    margin-top: 0;
    padding-top: 4px;
  `,

  LoadingText: styled.div`
    font-size: 12px;
    color: var(--F_Font_Color_Disabled);
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    box-shadow: var(--F_Outline);
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color);
    border-radius: var(--F_Tile_Radius);
  `,

  Name: styled.div`
    width: 100%;
    height: 24px;
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color);
  `,

  FileName: styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: var(--F_Font_Size_Label);
    color: var(--F_Font_Color);
  `,

  FileEntry: styled.li<{ level: number }>`
    position: relative;
    overflow: hidden;
    align-items: center;
    list-style:none;
    margin-bottom: .25rem;
    list-style: none ;
    margin-left: ${({ level }) => (level - 1) * 8}px; /* Adjust the indentation level as needed */
    cursor: pointer;
    
  `,

  File: styled.div`
  &:hover {
      background: var(--F_Surface_0);
    }
    &:active {
      background: var(--F_Surface);
    }
  `,

  Selected: styled.div`
    box-shadow: var(--F_Outline_Primary);
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: var(--F_Tile_Radius);
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 3;
  `,
}
